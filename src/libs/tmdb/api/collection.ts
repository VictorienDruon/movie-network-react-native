import { LanguageOption } from "tmdb-ts";
import Poster from "@/features/poster-card/types/Poster";
import { getTmdbClient } from "..";
import { isValidPoster } from "../utils/filter";
import { formatPoster } from "../utils/map";

export interface Collection {
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	parts: Poster[];
}

export async function collection(id: string, options?: LanguageOption) {
	try {
		const tmdb = await getTmdbClient();

		const result = await tmdb.collections.details(parseInt(id), options);

		const parts = result.parts.filter(isValidPoster).map(formatPoster);

		return {
			id: result.id,
			name: result.name,
			overview: result.overview,
			poster_path: result.poster_path,
			backdrop_path: result.backdrop_path,
			parts,
		} as Collection;
	} catch (error) {
		throw error;
	}
}
