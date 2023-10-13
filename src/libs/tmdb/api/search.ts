import { SearchEndpoint } from "tmdb-ts/dist/endpoints";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import { getTmdbClient } from "..";
import { isValidPerson, isValidPoster } from "../utils/filter";
import { formatPerson, formatPoster } from "../utils/map";
import { getNextCursor } from "../utils/pagination";

type Results<T extends keyof SearchEndpoint> = T extends "people"
	? Person[]
	: Poster[];

export type SearchPage<T extends keyof SearchEndpoint> = {
	results: Results<T>;
	nextCursor: number;
};

export async function search<T extends keyof SearchEndpoint>(
	endpoint: T,
	options: Parameters<SearchEndpoint[T]>[0]
): Promise<SearchPage<T>> {
	try {
		const tdmb = await getTmdbClient();

		const { results, page, total_pages } = await tdmb.search[endpoint](options);

		const formattedResults = (
			endpoint === "people"
				? results.filter(isValidPerson).map(formatPerson)
				: results.filter(isValidPoster).map(formatPoster)
		) as Results<T>;

		const nextCursor = getNextCursor(page, total_pages);

		return { results: formattedResults, nextCursor };
	} catch (error) {
		throw error;
	}
}
