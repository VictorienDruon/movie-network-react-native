import { DiscoverEndpoint } from "tmdb-ts/dist/endpoints";
import { getTmdbClient } from "..";
import { isValidPoster } from "../utils/filter";
import { formatPoster } from "../utils/map";
import { getNextCursor } from "../utils/pagination";
import Poster from "@/features/poster-card/types/Poster";

type Options<T extends keyof DiscoverEndpoint> = Parameters<
	DiscoverEndpoint[T]
>[0];

export interface DiscoverPage {
	posters: Poster[];
	nextCursor: number;
}

export async function discover<T extends keyof DiscoverEndpoint>(
	endpoint: T,
	options?: Options<T>
): Promise<DiscoverPage> {
	try {
		const tmdb = await getTmdbClient();

		const { results, page, total_pages } = await tmdb.discover[endpoint](
			options
		);

		const posters = results.filter(isValidPoster).map(formatPoster);

		const nextCursor = getNextCursor(page, total_pages);

		return { posters, nextCursor };
	} catch (error) {
		throw error;
	}
}
