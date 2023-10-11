const MAX_POSTERS = 18;

export function isValidPoster(poster, index: number) {
	return (
		index < MAX_POSTERS &&
		poster.poster_path !== null &&
		poster.backdrop_path !== null
	);
}
