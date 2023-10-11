import { DiscoverEndpoint } from "tmdb-ts/dist/endpoints";
import { getTmdbClient } from "..";
import { isValidPoster } from "../utils/filter";
import { formatMovie, formatShow } from "../utils/map";
import { getNextCursor } from "../utils/pagination";

type Options<T extends keyof DiscoverEndpoint> = Parameters<
	DiscoverEndpoint[T]
>[0];

export async function discoverMovies(options?: Options<"movie">) {
	try {
		const tmdb = await getTmdbClient();

		const { results, page, total_pages } = await tmdb.discover.movie(options);

		const posters = results.filter(isValidPoster).map(formatMovie);

		const nextCursor = getNextCursor(page, total_pages);

		return { posters, nextCursor };
	} catch (error) {
		throw error;
	}
}

export async function discoverShows(options?: Options<"tvShow">) {
	try {
		const tmdb = await getTmdbClient();

		const { results, page, total_pages } = await tmdb.discover.tvShow(options);

		const posters = results.filter(isValidPoster).map(formatShow);

		const nextCursor = getNextCursor(page, total_pages);

		return { posters, nextCursor };
	} catch (error) {
		throw error;
	}
}
