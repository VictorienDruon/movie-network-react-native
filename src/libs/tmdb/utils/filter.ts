import { Movie, Person, TV } from "tmdb-ts";

const MAX_POSTERS = 18;

export function isValidPoster(poster: Movie | TV, index: number) {
	return (
		index < MAX_POSTERS &&
		poster.poster_path !== null &&
		poster.backdrop_path !== null
	);
}

export function isValidPerson(person: Person, index: number) {
	return index < MAX_POSTERS && person.profile_path !== null;
}
