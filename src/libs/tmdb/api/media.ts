import {
	AppendToResponseMovieKey,
	AppendToResponseTvKey,
	Genre,
	WatchLocale,
} from "tmdb-ts";
import Region from "@/features/region-card/types/Region";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import { getTmdbClient } from "..";
import { isValidPerson, isValidPoster, isValidVideo } from "../utils/filter";
import {
	extractName,
	formatPerson,
	formatPoster,
	formatRegion,
} from "../utils/map";

export interface Media {
	id: number;
	title: string;
	date: string;
	overview: string;
	posterPath: string;
	backdropPath: string;
	videoKey: string;
	genres: Genre[];
	recommendations: Poster[];
	cast: Person[];
	crew: Person[];
	providers: WatchLocale;
	regions: Region[];
	// Movie specific properties
	runtime?: number;
	collection?: Poster;
	companiesNames?: string[];
	countriesNames?: string[];
	languagesNames?: string[];
	budget?: number;
	revenue?: number;
	// Show specific properties
	createdBy?: string[];
	lastEpisodeToAir?: {
		seasonNumber: number;
		episodeNumber: number;
		name: string;
	};
	inProduction?: boolean;
}

export async function getMovie(id: string): Promise<Media> {
	const appendToResponse: AppendToResponseMovieKey[] = [
		"videos",
		"credits",
		"recommendations",
		"watch/providers",
	];

	try {
		const tmdb = await getTmdbClient();

		const result = await tmdb.movies.details(parseInt(id), appendToResponse);

		const video = result.videos.results.findLast(isValidVideo);

		const recommendations = result.recommendations.results
			.filter(isValidPoster)
			.map(formatPoster);

		const cast = result.credits.cast.filter(isValidPerson).map(formatPerson);

		const crew = result.credits.crew.filter(isValidPerson).map(formatPerson);

		const providers = result["watch/providers"].results;

		const regions = Object.keys(providers).map(formatRegion);

		const collection =
			result.belongs_to_collection &&
			formatPoster(result.belongs_to_collection);

		const companiesNames = result.production_companies.flatMap(extractName);

		const countriesNames = result.production_countries.flatMap(extractName);

		const languagesNames = result.spoken_languages.flatMap(extractName);

		return {
			id: result.id,
			title: result.title,
			date: result.release_date,
			overview: result.overview,
			posterPath: result.poster_path,
			backdropPath: result.backdrop_path,
			videoKey: video && video.key,
			genres: result.genres,
			recommendations,
			cast,
			crew,
			providers,
			regions,
			runtime: result.runtime,
			collection,
			companiesNames,
			countriesNames,
			languagesNames,
			budget: result.budget,
			revenue: result.revenue,
		};
	} catch (error) {
		throw error;
	}
}

export async function getShow(id: string): Promise<Media> {
	const appendToResponse: AppendToResponseTvKey[] = [
		"videos",
		"aggregate_credits",
		"recommendations",
		"watch/providers",
	];

	try {
		const tmdb = await getTmdbClient();

		const result = await tmdb.tvShows.details(parseInt(id), appendToResponse);

		const video = result.videos.results.findLast(isValidVideo);

		const recommendations = result.recommendations.results
			.filter(isValidPoster)
			.map(formatPoster);

		const cast = result.aggregate_credits.cast
			.filter(isValidPerson)
			.map(formatPerson);

		const crew = result.aggregate_credits.crew
			.filter(isValidPerson)
			.map(formatPerson);

		const providers = result["watch/providers"].results;

		const regions = Object.keys(providers).map(formatRegion);

		const createdBy = result.created_by.map(extractName);

		const lastEpisodeToAir = {
			seasonNumber: result.last_episode_to_air.season_number,
			episodeNumber: result.last_episode_to_air.episode_number,
			name: result.last_episode_to_air.name,
		};

		return {
			id: result.id,
			title: result.name,
			date: result.first_air_date,
			overview: result.overview,
			posterPath: result.poster_path,
			backdropPath: result.backdrop_path,
			videoKey: video && video.key,
			genres: result.genres,
			recommendations,
			cast,
			crew,
			providers,
			regions,
			createdBy,
			lastEpisodeToAir,
			inProduction: result.in_production,
		};
	} catch (error) {
		throw error;
	}
}
