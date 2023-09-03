import { api } from "..";
import { Details as MovieDetails } from "../types/Movie";
import { Details as ShowDetails } from "../types/Show";

export async function getMovie(id: string) {
	const params = new URLSearchParams({
		language: "en-US",
	});

	try {
		const { data: details } = await api.get<MovieDetails>(`/movie/${id}`, {
			params,
		});

		return details;
	} catch (error) {
		throw error;
	}
}

export async function getShow(id: string) {
	const params = new URLSearchParams({
		language: "en-US",
	});

	try {
		const { data: details } = await api.get<ShowDetails>(`/tv/${id}`, {
			params,
		});

		return details;
	} catch (error) {
		throw error;
	}
}
