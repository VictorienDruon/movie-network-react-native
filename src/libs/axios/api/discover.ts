import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Poster } from "@/features/poster";

type Options = {
	include_adult?: string;
	language?: string;
	watch_region?: string;
	with_genres?: string;
	with_watch_providers?: string;
};

const MAX_POSTERS = 18;
const MAX_PAGES = 10;
const DEFAULT_OPTIONS: Options = {
	include_adult: "false",
	language: "en-US",
	watch_region: "",
	with_genres: "",
	with_watch_providers: "",
};

export async function discoverMovies(page: number, options = DEFAULT_OPTIONS) {
	const params = new URLSearchParams({
		page: page.toString(),
		...options,
	});

	try {
		const { data } = await api.get<Pagination>("/discover/movie", {
			params,
		});

		const posters: Poster[] = data.results
			.filter(
				(movie) => movie.poster_path !== null && movie.backdrop_path !== null
			)
			.map((movie) => ({
				tmdb_id: movie.id,
				title: movie.title,
				poster_path: movie.poster_path,
				backdrop_path: movie.backdrop_path,
				type: "movie",
			}));

		return {
			posters:
				posters.length > MAX_POSTERS ? posters.slice(0, MAX_POSTERS) : posters,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}

export async function discoverTv(page: number, options = DEFAULT_OPTIONS) {
	const params = new URLSearchParams({
		page: page.toString(),
		...options,
	});

	try {
		const { data } = await api.get<Pagination>("/discover/tv", {
			params,
		});

		const posters: Poster[] = data.results
			.filter((tv) => tv.poster_path !== null && tv.backdrop_path !== null)
			.map((tv) => ({
				tmdb_id: tv.id,
				title: tv.name,
				poster_path: tv.poster_path,
				backdrop_path: tv.backdrop_path,
				type: "tv",
			}));

		return {
			posters:
				posters.length > MAX_POSTERS ? posters.slice(0, MAX_POSTERS) : posters,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}
