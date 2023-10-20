import { QueryClient } from "@tanstack/react-query";
import { supabase } from "..";
import NewMedia from "../types/NewMedia";
import { getPage, getRange } from "../utils/pagination";
import { formatWatchlistItem } from "../utils/map";
import { WatchlistItem } from "@/features/watchlist/types/WatchlistItem";

type NewWatchlistItem = {
	user_id: string;
	media: NewMedia;
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

export async function addToWatchlist({
	user_id,
	media,
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
		status: "active",
	};

	const { error: watchlistsError } = await supabase
		.from("watchlists")
		.insert(newWatchlistRow);

	if (watchlistsError) throw watchlistsError;
}

export function handleAddToWatchlistSuccess(queryClient: QueryClient) {
	queryClient.invalidateQueries({
		queryKey: ["watchlist"],
	});
}
