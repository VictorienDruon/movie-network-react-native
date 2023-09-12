import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Poster } from "@/features/poster";

const MAX_POSTERS = 18;
const MAX_PAGES = 10;

export async function discoverMovies(page: number) {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination>("/discover/movie", {
			params,
		});

		const posters: Poster[] = data.results
			.filter((movie) => movie.poster_path !== null)
			.map((movie) => ({
				tmdb_id: movie.id,
				title: movie.title,
				poster_path: movie.poster_path,
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

export async function discoverShows(page: number) {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination>("/discover/tv", {
			params,
		});

		const posters: Poster[] = data.results
			.filter((movie) => movie.poster_path !== null)
			.map((show) => ({
				tmdb_id: show.id,
				title: show.name,
				poster_path: show.poster_path,
				type: "show",
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
