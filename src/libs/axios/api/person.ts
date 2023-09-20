import { Poster } from "@/features/poster";
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

		const movies: Poster[] = [];
		const tv: Poster[] = [];
		const directions: Poster[] = [];
		const writings: Poster[] = [];
		const productions: Poster[] = [];

		for (const media of data.combined_credits.cast) {
			if (media.backdrop_path !== null) {
				const poster: Poster = {
					tmdb_id: media.id,
					title: media.media_type === "movie" ? media.title : media.name,
					poster_path: media.poster_path,
					backdrop_path: media.backdrop_path,
					type: media.media_type,
				};
				switch (media.media_type) {
					case "movie":
						movies.push(poster);
						break;
					case "tv":
						tv.push(poster);
						break;
				}
			}
		}

		for (const media of data.combined_credits.crew) {
			if (media.backdrop_path !== null) {
				const poster = {
					tmdb_id: media.id,
					title: media.media_type === "movie" ? media.title : media.name,
					poster_path: media.poster_path,
					backdrop_path: media.backdrop_path,
					type: media.media_type,
				};
				switch (media.department) {
					case "Directing":
						directions.push(poster);
						break;
					case "Writing":
						writings.push(poster);
						break;
					case "Production":
						productions.push(poster);
				}
			}
		}

		const person: Person = {
			id: data.id,
			name: data.name,
			movies,
			tv,
			directions,
			writings,
			productions,
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
