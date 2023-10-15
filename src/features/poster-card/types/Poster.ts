interface Poster {
	id: string;
	title: string;
	posterPath: string;
	backdropPath: string;
	type: "movie" | "tv" | "collection";
}

export default Poster;
