import { Episode } from "./Episode";
import { Genre } from "./Genre";
import { Person } from "./Person";

export interface Show {
	adult: boolean;
	backdrop_path: string | null;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	vote_average: number;
	vote_count: number;
}

export interface ShowDetails extends Show {
	created_by: Person[];
	episode_run_time: number[];
	genres: Genre[];
	homepage: string;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: Episode;
}
