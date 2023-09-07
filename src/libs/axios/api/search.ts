import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Movie } from "../types/Movie";
import { Show } from "../types/Show";

export async function searchMovies(query: string) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
	});

	try {
		const { data } = await api.get<Pagination>("/search/movie", {
			params,
		});

		const movies = data.results.filter((movie) => movie.poster_path !== null);

		return movies;
	} catch (error) {
		throw error;
	}
}

export async function searchShows(query: string) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
	});

	try {
		const { data } = await api.get<Pagination<Show>>("/search/tv", {
			params,
		});

		const shows = data.results.filter((show) => show.poster_path !== null);

		return shows;
	} catch (error) {
		throw error;
	}
}
