import { getYear } from "@/utils/dates";
import { api } from "..";
import Details from "../types/Details";

export async function getMovie(id: string) {
	const params = new URLSearchParams({
		language: "en-US",
		append_to_response: "videos,credits,recommendations,watch/providers",
	});
	try {
		const { data } = await api.get(`/movie/${id}`, {
			params,
		});

		const video = data.videos.results.find(
			(video: any) => video.type === "Trailer"
		);

		const cast = data.credits.cast;

		const crew = data.credits.crew.filter((member: any) =>
			["Director", "Writer", "Original Music Composer"].includes(member.job)
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
				cast.length > 20
					? cast.slice(0, 20).map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  }))
					: cast.map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  })),

			crew:
				crew.legnth > 20
					? crew.slice(0, 20).map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.job,
							profile_path: member.profile_path,
					  }))
					: crew.map((member: any) => ({
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
				release_date: data.release_date,
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
	const params = new URLSearchParams({
		language: "en-US",
		append_to_response:
			"videos,aggregate_credits,recommendations,watch/providers",
	});

	try {
		const { data } = await api.get(`/tv/${id}`, {
			params,
		});

		const video = data.videos.results.find(
			(video: any) => video.type === "Trailer"
		);

		const cast = data["aggregate_credits"].cast;

		const crew = data["aggregate_credits"].crew.filter((member: any) =>
			["Director", "Writer", "Original Music Composer"].includes(
				member.jobs[0].job
			)
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
				cast.length > 20
					? cast.slice(0, 20).map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.roles[0].character,
							profile_path: member.profile_path,
					  }))
					: cast.map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.character,
							profile_path: member.profile_path,
					  })),

			crew:
				crew.length > 20
					? crew.slice(0, 20).map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.jobs[0].job,
							profile_path: member.profile_path,
					  }))
					: crew.map((member: any) => ({
							id: member.id,
							name: member.name,
							role: member.jobs[0].job,
							profile_path: member.profile_path,
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
				created_by: data.created_by.flatMap((creator: any) => creator.name),
				release_date: data.first_air_date,
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
