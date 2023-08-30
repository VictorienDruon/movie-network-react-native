import { api } from "..";
import { ApiResponse, Movie, Show } from "../types";

export async function discoverMovies(page: number) {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<ApiResponse<Movie>>(`/discover/movie`, {
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
		const { data } = await api.get<ApiResponse<Show>>(`/discover/tv`, {
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
