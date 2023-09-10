import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Poster } from "@/features/poster";

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

		const movies: Poster[] = data.results
			.filter((movie) => movie.poster_path !== null)
			.map((movie) => ({
				id: movie.id,
				title: movie.title,
				poster_path: movie.poster_path,
				type: "movie",
			}));

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
		const { data } = await api.get<Pagination>("/search/tv", {
			params,
		});

		const shows: Poster[] = data.results
			.filter((show) => show.poster_path !== null)
			.map((show) => ({
				id: show.id,
				title: show.name,
				poster_path: show.poster_path,
				type: "movie",
			}));

		return shows;
	} catch (error) {
		throw error;
	}
}
