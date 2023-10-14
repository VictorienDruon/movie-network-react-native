import { Cast, Crew, Movie, Person, Recommendation, TV, Video } from "tmdb-ts";

const PAGE_SIZE = 18;

export function isValidPoster(
	poster: Movie | TV | Recommendation,
	index: number = 0
) {
	return (
		index < PAGE_SIZE &&
		poster.poster_path !== null &&
		poster.backdrop_path !== null
	);
}

export function isValidPerson(person: Person | Cast | Crew, index: number) {
	return index < PAGE_SIZE && person.profile_path !== null;
}

export function isValidVideo(video: Video) {
	return video.type === "Trailer" && video.site === "YouTube";
}
