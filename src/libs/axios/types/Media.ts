export interface Media {
	adult: boolean;
	backdrop_path: string | null;
	first_air_date?: string;
	genre_ids: number[];
	id: number;
	media_type: "movie" | "tv";
	name?: string;
	original_language: string;
	original_name?: string;
	original_title?: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date?: string;
	title?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	origin_country?: string[];
}
