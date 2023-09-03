import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Movie } from "../types/Movie";
import { Show } from "../types/Show";

export async function discoverMovies(page: number) {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination<Movie>>("/discover/movie", {
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

export async function discoverShows(page: number) {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination<Show>>("/discover/tv", {
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
