import { Cast, Crew } from "./Credits";
import { Genre } from "./Genre";
import { Video } from "./Video";
import { Provider } from "./Providers";
import { Recommendation } from "./Recommendation";
import { Person } from "./Person";
import { Episode } from "./Episode";

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
	video: Video;
	cast: Cast[];
	crew: Crew[];
	providers: Provider[];
	recommendations: Recommendation[];
}
