interface Poster {
	id: number;
	title: string;
	posterPath: string;
	backdropPath: string;
	type: "movie" | "tv" | "collection";
}

export default Poster;
