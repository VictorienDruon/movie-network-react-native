import { Poster } from "@/features/poster";
import { Person } from "@/features/person";
import { Providers } from "./Providers";

interface Show {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	first_air_date: string;
	last_episode_to_air: {
		season_number: number;
		episode_number: number;
		name: string;
	};
	in_production: boolean;
	genres: {
		id: number;
		name: string;
	}[];
	cast: Person[];
	created_by: Person[];
	recommendations: Poster[];
	videoKey: string;
	providers: Providers;
}

export default Show;

// const show: Show = {
// 			id: data.id,
// 			title: data.name,
// 			poster_path: data.poster_path,
// 			backdrop_path: data.backdrop_path,
// 			first_air_date: data.first_air_date,
// 			in_production: data.in_production,
// 			overview: data.overview,
// 			genres: data.genres,
// 			cast:
// 				data.credits.cast.length > 20
// 					? data.credits.cast.slice(0, 20).map((member) => ({
// 							id: member.id,
// 							name: member.name,
// 							role: member.character,
// 							profile_path: member.profile_path,
// 					  }))
// 					: data.credits.cast.map((member) => ({
// 							id: member.id,
// 							name: member.name,
// 							role: member.character,
// 							profile_path: member.profile_path,
// 					  })),
// 			created_by: data.created_by.map((creator) => ({
// 				id: creator.id,
// 				name: creator.name,
// 				profile_path: creator.profile_path,
// 			})),
// 			recommendations: data.recommendations.results
// 				.filter((movie) => movie.poster_path !== null)
// 				.map((movie) => ({
// 					id: movie.id,
// 					title: movie.title,
// 					poster_path: movie.poster_path,
// 					type: "movie",
// 				})),
// 			video: data.videos.results.find((video) => video.type === "Trailer"),
// 			providers:
// 				regionCode in data["watch/providers"].results
// 					? data["watch/providers"].results[regionCode]
// 					: data["watch/providers"].results.US,
// 		};
