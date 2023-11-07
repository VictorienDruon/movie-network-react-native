import { Platform } from "react-native";
import {
	AppendToResponseMovieKey,
	AppendToResponseTvKey,
	Buy,
	Flatrate,
	Genre,
	Rent,
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
	voteAverage: number;
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

		const movie = await tmdb.movies.details(parseInt(id), appendToResponse);

		const video = movie.videos.results.findLast(isValidVideo);

		const recommendations = movie.recommendations.results
			.filter(isValidPoster)
			.map(formatPoster);

		const cast = movie.credits.cast.filter(isValidPerson).map(formatPerson);

		const crew = movie.credits.crew.filter(isValidPerson).map(formatPerson);

		const providers = filterWatchLocale(movie["watch/providers"].results);

		const regions = Object.keys(providers).map(formatRegion);

		const collection =
			movie.belongs_to_collection && formatPoster(movie.belongs_to_collection);

		const companiesNames = movie.production_companies.flatMap(extractName);

		const countriesNames = movie.production_countries.flatMap(extractName);

		const languagesNames = movie.spoken_languages.flatMap(extractName);

		return {
			id: movie.id,
			title: movie.title,
			date: movie.release_date,
			voteAverage: movie.vote_average,
			overview: movie.overview,
			posterPath: movie.poster_path,
			backdropPath: movie.backdrop_path,
			videoKey: video && video.key,
			genres: movie.genres,
			recommendations,
			cast,
			crew,
			providers,
			regions,
			runtime: movie.runtime,
			collection,
			companiesNames,
			countriesNames,
			languagesNames,
			budget: movie.budget,
			revenue: movie.revenue,
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

		const show = await tmdb.tvShows.details(parseInt(id), appendToResponse);

		const video = show.videos.results.findLast(isValidVideo);

		const recommendations = show.recommendations.results
			.filter(isValidPoster)
			.map(formatPoster);

		const cast = show.aggregate_credits.cast
			.filter(isValidPerson)
			.map(formatPerson);

		const crew = show.aggregate_credits.crew
			.filter(isValidPerson)
			.map(formatPerson);

		const providers = filterWatchLocale(show["watch/providers"].results);

		const regions = Object.keys(providers).map(formatRegion);

		const createdBy = show.created_by.map(extractName);

		const lastEpisodeToAir = show.last_episode_to_air && {
			seasonNumber: show.last_episode_to_air.season_number,
			episodeNumber: show.last_episode_to_air.episode_number,
			name: show.last_episode_to_air.name,
		};
		return {
			id: show.id,
			title: show.name,
			date: show.first_air_date,
			voteAverage: show.vote_average,
			overview: show.overview,
			posterPath: show.poster_path,
			backdropPath: show.backdrop_path,
			videoKey: video && video.key,
			genres: show.genres,
			recommendations,
			cast,
			crew,
			providers,
			regions,
			createdBy,
			lastEpisodeToAir,
			inProduction: show.in_production,
		};
	} catch (error) {
		throw error;
	}
}

function filterWatchLocale(watchLocale: WatchLocale) {
	const filteredWatchLocale = {};

	for (const [region, providersCategoriesWithLink] of Object.entries(
		watchLocale
	) as [
		string,
		{
			link: string;
			flatrate: Flatrate[];
			rent: Rent[];
			buy: Buy[];
		}
	][]) {
		const { link, ...providersCategories } = providersCategoriesWithLink;
		filteredWatchLocale[region] = { link };

		for (const [category, providers] of Object.entries(providersCategories)) {
			const filteredProviders = providers.filter((provider) =>
				Platform.OS === "ios"
					? provider.provider_id !== 3
					: provider.provider_id !== 350
			);

			if (filteredProviders.length > 0) {
				filteredWatchLocale[region][category] = filteredProviders;
			}
		}

		if (Object.keys(filteredWatchLocale[region]).length === 1) {
			delete filteredWatchLocale[region];
		}
	}

	return filteredWatchLocale as WatchLocale;
}
