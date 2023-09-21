import { api } from "..";
import Media from "../types/Media";

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

		const movie: Media = {
			id: data.id,
			title: data.title,
			poster_path: data.poster_path,
			backdrop_path: data.backdrop_path,
			overview: data.overview,
			release_date: data.release_date,
			runtime: data.runtime,
			genres: data.genres,
			companies: data.production_companies.flatMap(
				(company: any) => company.name
			),
			countries: data.production_countries.flatMap(
				(country: any) => country.name
			),
			languages: data.spoken_languages.flatMap(
				(language: any) => language.name
			),
			budget: data.budget,
			revenue: data.revenue,

			collection: data.belongs_to_collection && {
				tmdb_id: data.belongs_to_collection.id,
				title: data.belongs_to_collection.name,
				poster_path: data.belongs_to_collection.poster_path,
				backdrop_path: data.belongs_to_collection.backdrop_path,
				type: "collection",
			},

			recommendations: data.recommendations.results
				.filter((r: any) => r.poster_path !== null && r.backdrop_path !== null)
				.map((r: any) => ({
					tmdb_id: r.id,
					title: r.title,
					poster_path: r.poster_path,
					backdrop_path: r.backdrop_path,
					type: "movie",
				})),

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

		const tv: Media = {
			id: data.id,
			title: data.name,
			poster_path: data.poster_path,
			backdrop_path: data.backdrop_path,
			overview: data.overview,
			release_date: data.first_air_date,
			genres: data.genres,
			created_by: data.created_by.flatMap((creator: any) => creator.name),
			last_episode_to_air: data.last_episode_to_air,
			in_production: data.in_production,

			recommendations: data.recommendations.results
				.filter(
					(tv: any) => tv.poster_path !== null && tv.backdrop_path !== null
				)
				.map((tv: any) => ({
					tmdb_id: tv.id,
					title: tv.name,
					poster_path: tv.poster_path,
					type: "tv",
				})),

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

			videoKey: video ? video.key : "",

			providers: data["watch/providers"].results,
		};

		return tv;
	} catch (error) {
		throw error;
	}
}
