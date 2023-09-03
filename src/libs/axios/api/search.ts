import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Movie } from "../types/Movie";
import { Show } from "../types/Show";

export async function searchMovies(query: string, page: number) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination<Movie>>("/search/movie", {
			params,
		});

		return {
			movies: data.results,
			nextCursor: data.page < data.total_pages ? data.page + 1 : undefined,
		};
	} catch (error) {
		throw error;
	}
}

export async function searchShows(query: string, page: number) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination<Show>>("/search/tv", {
			params,
		});

		return {
			shows: data.results,
			nextCursor: data.page < data.total_pages ? data.page + 1 : undefined,
		};
	} catch (error) {
		throw error;
	}
}
