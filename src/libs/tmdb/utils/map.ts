import { Movie, Person as TmdbPerson, TV } from "tmdb-ts";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";

export function formatPoster(media: Movie | TV) {
	if ("title" in media) {
		const movie = media as Movie;
		return {
			id: movie.id,
			title: movie.title,
			poster_path: movie.poster_path,
			backdrop_path: movie.backdrop_path,
			type: "movie",
		} as Poster;
	} else {
		const show = media as TV;
		return {
			id: show.id,
			title: show.name,
			poster_path: show.poster_path,
			backdrop_path: show.backdrop_path,
			type: "tv",
		} as Poster;
	}
}

export function formatPerson(person: TmdbPerson) {
	return {
		id: person.id,
		name: person.name,
		profile_path: person.profile_path,
	} as Person;
}
