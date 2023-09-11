import { getLocales } from "expo-localization";
import { api } from "..";
import Movie from "../types/Movie";
import Show from "../types/Show";

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

		const video = data.videos.results.find(
			(video: any) => video.type === "Trailer"
		);

		const movie: Movie = {
			id: data.id,
			title: data.title,
			poster_path: data.poster_path,
			backdrop_path: data.backdrop_path,
			overview: data.overview,
			release_date: data.release_date,
			runtime: data.runtime,
			budget: data.budget,
			revenue: data.revenue,
			genres: data.genres,
			collection: data.belongs_to_collection,
			companies: data.production_companies.flatMap(
				(company: any) => company.name
			),
			countries: data.production_countries.flatMap(
				(country: any) => country.name
			),
			languages: data.spoken_languages.flatMap(
				(language: any) => language.name
			),

			cast:
				data.credits.cast.length > 20
					? data.credits.cast.slice(0, 20).map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  }))
					: data.credits.cast.map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  })),

			crew: data.credits.crew
				.filter((member: any) =>
					["Director", "Writer", "Original Music Composer"].includes(member.job)
				)
				.map((member: any) => ({
					id: member.id,
					name: member.name,
					role: member.job,
					profile_path: member.profile_path,
				})),

			recommendations: data.recommendations.results
				.filter((movie: any) => movie.poster_path !== null)
				.map((movie: any) => ({
					tmdb_id: movie.id,
					title: movie.title,
					poster_path: movie.poster_path,
					type: "movie",
				})),

			videoKey: video ? video.key : "",

			providers:
				regionCode in data["watch/providers"].results
					? data["watch/providers"].results[regionCode]
					: data["watch/providers"].results.US,
		};

		return movie;
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

		const video = data.videos.results.find(
			(video: any) => video.type === "Trailer"
		);

		const show: Show = {
			id: data.id,
			title: data.name,
			poster_path: data.poster_path,
			overview: data.overview,
			backdrop_path: data.backdrop_path,
			first_air_date: data.first_air_date,
			last_episode_to_air: data.last_episode_to_air,
			in_production: data.in_production,
			genres: data.genres,

			cast:
				data.credits.cast.length > 20
					? data.credits.cast.slice(0, 20).map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  }))
					: data.credits.cast.map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  })),

			created_by: data.created_by.map((creator: any) => ({
				id: creator.id,
				name: creator.name,
				profile_path: creator.profile_path,
			})),

			recommendations: data.recommendations.results
				.filter((movie: any) => movie.poster_path !== null)
				.map((movie: any) => ({
					tmdb_id: movie.id,
					title: movie.name,
					poster_path: movie.poster_path,
					type: "show",
				})),

			videoKey: video ? video.key : "",

			providers:
				regionCode in data["watch/providers"].results
					? data["watch/providers"].results[regionCode]
					: data["watch/providers"].results.US,
		};

		return show;
	} catch (error) {
		throw error;
	}
}
