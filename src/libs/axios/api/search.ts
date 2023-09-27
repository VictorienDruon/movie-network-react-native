import Person from "@/features/person-card/types/Person";
import { api } from "..";
import { Pagination } from "../types/Pagination";
import Poster from "@/features/poster-card/types/Poster";

const MAX_POSTERS = 18;
const MAX_PAGES = 10;

export async function searchMovies(query: string, page: number) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination>("/search/movie", {
			params,
		});

		const posters: Poster[] = data.results
			.filter(
				(movie) => movie.poster_path !== null && movie.backdrop_path !== null
			)
			.map((movie) => ({
				id: movie.id,
				title: movie.title,
				poster_path: movie.poster_path,
				backdrop_path: movie.backdrop_path,
				type: "movie",
			}));

		return {
			posters:
				posters.length > MAX_POSTERS ? posters.slice(0, MAX_POSTERS) : posters,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}

export async function searchTv(query: string, page: number) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination>("/search/tv", {
			params,
		});

		const posters: Poster[] = data.results
			.filter((tv) => tv.poster_path !== null && tv.backdrop_path !== null)
			.map((tv) => ({
				id: tv.id,
				title: tv.name,
				poster_path: tv.poster_path,
				backdrop_path: tv.backdrop_path,
				type: "tv",
			}));

		return {
			posters:
				posters.length > MAX_POSTERS ? posters.slice(0, MAX_POSTERS) : posters,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}

export async function searchPeople(query: string, page: number) {
	const params = new URLSearchParams({
		query,
		include_adult: "false",
		language: "en-US",
		page: page.toString(),
	});

	try {
		const { data } = await api.get<Pagination>("search/person", { params });

		const people: Person[] = data.results.map((person: any) => ({
			id: person.id,
			name: person.name,
			profile_path: person.profile_path,
		}));

		return {
			people:
				people.length > MAX_POSTERS ? people.slice(0, MAX_POSTERS) : people,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}
