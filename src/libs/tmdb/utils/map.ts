import { Movie, TV } from "tmdb-ts";
import Poster from "@/features/poster-card/types/Poster";

export function formatMovie(movie: Movie) {
	const posters: Poster = {
		id: movie.id,
		title: movie.title,
		poster_path: movie.poster_path,
		backdrop_path: movie.backdrop_path,
		type: "movie",
	};

	return posters;
}

export function formatShow(show: TV) {
	const posters: Poster = {
		id: show.id,
		title: show.name,
		poster_path: show.poster_path,
		backdrop_path: show.backdrop_path,
		type: "tv",
	};

	return posters;
}
