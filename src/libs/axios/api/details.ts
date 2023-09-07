import { getLocales } from "expo-localization";
import { api } from "..";
import { MovieDetails } from "../types/Movie";
import { ShowDetails } from "../types/Show";
import { Video } from "../types/Video";
import { CrewMember } from "../types/Credits";

export async function getMovie(movieId: string) {
	const locales = getLocales();
	const regionCode = locales[0].regionCode;

	const params = new URLSearchParams({
		language: "en-US",
		append_to_response: "videos,credits,watch/providers,recommendations",
	});

	try {
		const { data } = await api.get(`/movie/${movieId}`, {
			params,
		});

		const {
			videos,
			credits,
			"watch/providers": watchProviders,
			recommendations: { results },
			...rest
		} = data;

		const video = videos.results.find(
			(video: Video) => video.type === "Trailer"
		);
		const cast =
			credits.cast.length > 20 ? data.credits.cast.slice(0, 20) : credits.cast;
		const crew = credits.crew.filter((member: CrewMember) =>
			["Director", "Writer", "Original Music Composer"].includes(member.job)
		);
		const providers =
			regionCode in watchProviders.results
				? watchProviders.results[regionCode]
				: watchProviders.results.US;
		const recommendations = results;

		const details: MovieDetails = {
			video,
			cast,
			crew,
			providers,
			recommendations,
			...rest,
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

		const {
			videos,
			credits,
			"watch/providers": watchProviders,
			recommendations: { results },
			...rest
		} = data;

		const video = videos.results.find(
			(video: Video) => video.type === "Trailer"
		);
		const cast =
			credits.cast.length > 20 ? data.credits.cast.slice(0, 20) : credits.cast;
		const providers =
			regionCode in watchProviders.results
				? watchProviders.results[regionCode]
				: watchProviders.results.US;
		const recommendations = results;

		const details: ShowDetails = {
			video,
			cast,
			providers,
			recommendations,
			...rest,
		};

		return details;
	} catch (error) {
		throw error;
	}
}
