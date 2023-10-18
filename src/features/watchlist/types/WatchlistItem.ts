export interface WatchlistItem {
	id: string;
	type: "movie" | "tv" | "collection";
	title: string;
	posterPath: string;
	backdropPath: string;
	date: string;
	runtime: number;
	seasonNumber: number;
	rating: number;
	overview: string;
}
