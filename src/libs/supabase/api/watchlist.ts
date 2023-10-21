import { QueryClient } from "@tanstack/react-query";
import { supabase } from "..";
import NewMedia from "../types/NewMedia";
import { getPage, getRange } from "../utils/pagination";
import { formatWatchlistItem } from "../utils/map";
import { WatchlistItem } from "@/features/watchlist/types/WatchlistItem";

export type Status = "active" | "seen" | "deleted";

type NewWatchlistItem = {
	user_id: string;
	media: NewMedia;
	status: Status;
};

export async function getWatchlist(page: number) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { from, to } = getRange(page);

	const { data: watchlist, error } = await supabase
		.from("watchlists")
		.select("media(*)")
		.eq("user_id", session.user.id)
		.eq("status", "active")
		.range(from, to);

	if (error) throw error;

	const flattenWatchlist = watchlist.flatMap((item) => item.media);
	const formattedWatchlist = flattenWatchlist.map(formatWatchlistItem);

	return getPage<WatchlistItem>(formattedWatchlist, page);
}

export async function isMediaInWatchlist(type: string, id: string) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: media, error } = await supabase
		.from("watchlists")
		.select("media(type, id)")
		.eq("user_id", session.user.id)
		.eq("status", "active");
	if (error) throw error;

	return media.some(
		(item) => item.media.type === type && item.media.id === parseInt(id)
	);
}

export async function updateWatchlist({
	user_id,
	media,
	status,
}: NewWatchlistItem): Promise<void> {
	const { data: updatedMedia, error: mediaError } = await supabase
		.from("media")
		.upsert(media)
		.select()
		.single();

	if (mediaError) throw mediaError;

	const newWatchlistRow = {
		user_id,
		media_id: updatedMedia.uuid,
		status,
	};

	const { error: watchlistsError } = await supabase
		.from("watchlists")
		.upsert(newWatchlistRow);

	if (watchlistsError) throw watchlistsError;
}

export function handleUpdateWatchlist(
	queryClient: QueryClient,
	type: string,
	id: string
) {
	queryClient.invalidateQueries({
		queryKey: ["watchlist"],
	});
	queryClient.invalidateQueries({
		queryKey: ["isInWatchlist", type, id],
	});
}
