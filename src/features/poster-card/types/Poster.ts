type Poster = {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	type: "movie" | "tv" | "collection";
};

export default Poster;