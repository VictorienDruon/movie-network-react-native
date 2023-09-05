import { getLocales } from "expo-localization";
import { api } from "..";
import { MovieDetails } from "../types/Movie";
import { ShowDetails } from "../types/Show";

export async function getMovie(id: string) {
	const params = new URLSearchParams({
		language: "en-US",
		append_to_response: "credits,videos,watch/providers",
	});

	try {
		const { data } = await api.get(`/movie/${id}`, {
			params,
		});

		const details: MovieDetails = {
			...data,
			providers: data["watch/providers"].results.US.flatrate,
			cast: data.credits.cast,
			crew: data.credits.crew,
			videos: data.videos.results,
		};

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
