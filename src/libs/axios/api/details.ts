import { getDateWithYear, getYear } from "@/utils/dates";
import { api } from "..";
import Details from "../types/Details";

const PARAMS = new URLSearchParams({
	language: "en-US",
	append_to_response: "videos,credits,recommendations,watch/providers",
});

export async function getMovie(id: string) {
	try {
		const { data } = await api.get(`/movie/${id}`, {
			params: PARAMS,
		});

		const video = data.videos.results.find(
			(video: any) => video.type === "Trailer"
		);

		const movie: Details = {
			id: data.id,
			title: data.title,
			poster_path: data.poster_path,
			backdrop_path: data.backdrop_path,
			overview: data.overview,
			release_year: getYear(new Date(data.release_date)),
			runtime: data.runtime,

			genres: data.genres,
			collection: data.belongs_to_collection,

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

			informations: {
				companies: data.production_companies.flatMap(
					(company: any) => company.name
				),
				countries: data.production_countries.flatMap(
					(country: any) => country.name
				),
				languages: data.spoken_languages.flatMap(
					(language: any) => language.name
				),
				release_date: getDateWithYear(new Date(data.release_date)),
				budget: data.budget,
				revenue: data.revenue,
			},

			videoKey: video ? video.key : "",

			providers: data["watch/providers"].results,
		};

		return movie;
	} catch (error) {
		throw error;
	}
}

export async function getTv(id: string) {
	try {
		const { data } = await api.get(`/tv/${id}`, {
			params: PARAMS,
		});

		const video = data.videos.results.find(
			(video: any) => video.type === "Trailer"
		);

		const tv: Details = {
			id: data.id,
			title: data.name,
			poster_path: data.poster_path,
			overview: data.overview,
			backdrop_path: data.backdrop_path,
			release_year: getYear(new Date(data.first_air_date)),
			season_number: data.last_episode_to_air.season_number,
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

			crew: data.created_by.map((creator: any) => ({
				id: creator.id,
				name: creator.name,
				role: "Creator",
				profile_path: creator.profile_path,
			})),

			recommendations: data.recommendations.results
				.filter((movie: any) => movie.poster_path !== null)
				.map((movie: any) => ({
					tmdb_id: movie.id,
					title: movie.name,
					poster_path: movie.poster_path,
					type: "tv",
				})),

			informations: {
				release_date: getDateWithYear(new Date(data.first_air_date)),
				last_episode_to_air: data.last_episode_to_air,
				in_production: data.in_production,
			},

			videoKey: video ? video.key : "",

			providers: data["watch/providers"].results,
		};

		return tv;
	} catch (error) {
		throw error;
	}
}
