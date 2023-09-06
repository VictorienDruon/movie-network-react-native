import { getLocales } from "expo-localization";
import { api } from "..";
import { MovieDetails } from "../types/Movie";
import { ShowDetails } from "../types/Show";
import { Video } from "../types/Video";

export async function getMovie(id: string) {
	const locales = getLocales();
	const regionCode = locales[0].regionCode;

	const params = new URLSearchParams({
		language: "en-US",
		append_to_response: "videos,credits,watch/providers,recommendations",
	});

	try {
		const { data } = await api.get(`/movie/${id}`, {
			params,
		});

		const { videos, credits, "watch/providers": providers, ...rest } = data;

		const details: MovieDetails = {
			...rest,
			video: videos.results.find((video: Video) => video.type === "Trailer"),
			cast: credits.cast.length > 20 ? credits.cast.slice(0, 20) : credits.cast,
			crew: credits.crew.length > 5 ? credits.crew.slice(0, 5) : credits.crew,
			providers:
				regionCode in providers.results
					? providers.results[regionCode]
					: providers.results.US,
			recommendations: data.recommendations.results,
		};

		return details;
	} catch (error) {
		throw error;
	}
}

export async function getShow(id: string) {
	const locales = getLocales();
	const regionCode = locales[0].regionCode;

	const params = new URLSearchParams({
		language: "en-US",
		append_to_response: "videos,credits,watch/providers,recommendations",
	});

	try {
		const { data } = await api.get(`/tv/${id}`, {
			params,
		});

		const { videos, credits, "watch/providers": providers, ...rest } = data;

		const details: ShowDetails = {
			...rest,
			video: videos.results.find((video: Video) => video.type === "Trailer"),
			cast: credits.cast.length > 20 ? credits.cast.slice(0, 20) : credits.cast,
			crew: credits.crew.length > 5 ? credits.crew.slice(0, 5) : credits.crew,
			providers:
				regionCode in providers.results
					? providers.results[regionCode]
					: providers.results.US,
			recommendations: data.recommendations.results,
		};

		return details;
	} catch (error) {
		throw error;
	}
}
