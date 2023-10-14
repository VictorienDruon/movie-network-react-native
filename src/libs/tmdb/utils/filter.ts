import { Cast, Crew, Movie, Person, Recommendation, TV, Video } from "tmdb-ts";

const MAX_ITEMS = 18;

export function isValidPoster(
	poster: Movie | TV | Recommendation,
	index: number = 0
) {
	return (
		index < MAX_ITEMS &&
		poster.poster_path !== null &&
		poster.backdrop_path !== null
	);
}

export function isValidPerson(person: Person | Cast | Crew, index: number) {
	return index < MAX_ITEMS && person.profile_path !== null;
}

export function isValidVideo(video: Video) {
	return video.type === "Trailer" && video.site === "YouTube";
}
