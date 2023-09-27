import { api } from "..";
import Person from "../types/Person";

export async function getPerson(id: string) {
	const params = new URLSearchParams({
		language: "en-US",
		append_to_response: "combined_credits",
	});

	try {
		const { data } = await api.get(`/person/${id}`, {
			params,
		});

		const movies = [];
		const shows = [];
		const directed = [];
		const written = [];
		const composed = [];
		const uniqueMovieIds = new Set<number>();
		const uniqueShowsIds = new Set<number>();
		const uniqueDirectedIds = new Set<number>();
		const uniqueWrittenIds = new Set<number>();
		const uniqueComposedIds = new Set<number>();

		for (const media of data.combined_credits.cast) {
			if (media.poster_path !== null && media.backdrop_path !== null) {
				const poster = {
					id: media.id,
					title: media.media_type === "movie" ? media.title : media.name,
					poster_path: media.poster_path,
					backdrop_path: media.backdrop_path,
					type: media.media_type,
					vote_count: media.vote_count,
				};
				switch (media.media_type) {
					case "movie":
						if (!uniqueMovieIds.has(media.id)) {
							movies.push(poster);
							uniqueMovieIds.add(media.id);
						}
						break;
					case "tv":
						if (!uniqueShowsIds.has(media.id)) {
							shows.push(poster);
							uniqueShowsIds.add(media.id);
						}
						break;
				}
			}
		}

		for (const media of data.combined_credits.crew) {
			if (media.poster_path !== null && media.backdrop_path !== null) {
				const poster = {
					id: media.id,
					title: media.media_type === "movie" ? media.title : media.name,
					poster_path: media.poster_path,
					backdrop_path: media.backdrop_path,
					type: media.media_type,
				};
				switch (media.department) {
					case "Directing":
						if (!uniqueDirectedIds.has(media.id)) {
							directed.push(poster);
							uniqueDirectedIds.add(media.id);
						}
						break;
					case "Writing":
						if (!uniqueWrittenIds.has(media.id)) {
							written.push(poster);
							uniqueWrittenIds.add(media.id);
						}
						break;
					case "Sound":
						if (!uniqueComposedIds.has(media.id)) {
							composed.push(poster);
							uniqueComposedIds.add(media.id);
						}
				}
			}
		}

		const person: Person = {
			id: data.id,
			name: data.name,
			movies: movies.sort((a, b) => b.vote_count - a.vote_count),
			shows: shows.sort((a, b) => b.vote_count - a.vote_count),
			directed: directed.sort((a, b) => b.vote_count - a.vote_count),
			written: written.sort((a, b) => b.vote_count - a.vote_count),
			composed: composed.sort((a, b) => b.vote_count - a.vote_count),
			biography: data.biography,
			place_of_birth: data.place_of_birth,
			birthday: data.birthday,
			deathday: data.deathday,
			department: data.known_for_department,
		};

		return person;
	} catch (error) {
		throw error;
	}
}
