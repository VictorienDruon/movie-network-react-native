import { DiscoverEndpoint } from "tmdb-ts/dist/endpoints";
import Poster from "@/features/poster-card/types/Poster";
import { getTmdbClient } from "..";
import { isValidPoster } from "../utils/filter";
import { formatPoster } from "../utils/map";
import { getNextCursor } from "../utils/pagination";

export interface DiscoverPage {
	results: Poster[];
	nextCursor?: number;
}

export async function discover<T extends keyof DiscoverEndpoint>(
	endpoint: T,
	options?: Parameters<DiscoverEndpoint[T]>[0]
): Promise<DiscoverPage> {
	try {
		const tmdb = await getTmdbClient();

		const { results, page, total_pages } = await tmdb.discover[endpoint](
			options
		);

		const formattedResults = results.filter(isValidPoster).map(formatPoster);

		const nextCursor = getNextCursor(page, total_pages);

		return { results: formattedResults, nextCursor };
	} catch (error) {
		throw error;
	}
}
