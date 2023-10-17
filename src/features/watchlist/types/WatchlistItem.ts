export interface WatchlistItem {
	id: string;
	title: string;
	posterPath: string;
	backdropPath: string;
	type: "movie" | "tv" | "collection";
}
