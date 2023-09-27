import { Poster } from "@/features/poster";
import { api } from "..";
import { Pagination } from "../types/Pagination";
import Person from "@/features/person-card/types/Person";

const MAX_ITEMS = 18;
const MAX_PAGES = 10;

export async function getDayTrending() {
	try {
		const { data } = await api.get("/trending/all/day");

		const posters: Poster[] = data.results
			.filter(
				(media: any) =>
					media.poster_path !== null && media.backdrop_path !== null
			)
			.map((media: any) => ({
				id: media.id,
				title: media.title || media.name,
				poster_path: media.poster_path,
				backdrop_path: media.backdrop_path,
				type: media.media_type,
			}));

		return posters.length > MAX_ITEMS ? posters.slice(0, MAX_ITEMS) : posters;
	} catch (error) {
		throw error;
	}
}

export async function getMediaTrending(
	page: number,
	mediaType: "all" | "movie" | "tv"
) {
	const params = new URLSearchParams({
		page: page.toString(),
		language: "en-US",
	});

	try {
		const { data } = await api.get<Pagination>(`/trending/${mediaType}/week`, {
			params,
		});

		const posters: Poster[] = data.results
			.filter(
				(media: any) =>
					media.poster_path !== null && media.backdrop_path !== null
			)
			.map((media: any) => ({
				id: media.id,
				title: media.title || media.name,
				poster_path: media.poster_path,
				backdrop_path: media.backdrop_path,
				type: media.media_type,
			}));

		return {
			posters:
				posters.length > MAX_ITEMS ? posters.slice(0, MAX_ITEMS) : posters,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}

export async function getPeopleTrending(page: number) {
	const params = new URLSearchParams({
		page: page.toString(),
		language: "en-US",
	});

	try {
		const { data } = await api.get(`/trending/person/week`, {
			params,
		});

		const people: Person[] = data.results
			.filter((person: any) => person.profile_path !== null)
			.map((person: any) => ({
				id: person.id,
				name: person.name,
				profile_path: person.profile_path,
			}));

		return {
			people: people.length > MAX_ITEMS ? people.slice(0, MAX_ITEMS) : people,
			nextCursor:
				data.page < data.total_pages && data.page < MAX_PAGES
					? data.page + 1
					: undefined,
		};
	} catch (error) {
		throw error;
	}
}
