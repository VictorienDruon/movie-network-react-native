import { CastMember, Creator } from "./Credits";
import { Genre } from "./Genre";
import { Video } from "./Video";
import { Provider } from "./Providers";
import { Recommendation } from "./Recommendation";
import { Episode } from "./Episode";

export interface Show {
	backdrop_path: string | null;
	first_air_date: string;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
}

export interface ShowDetails extends Show {
	created_by: Creator[];
	genres: Genre[];
	in_production: boolean;
	last_episode_to_air: Episode;
	video: Video;
	cast: CastMember[];
	providers: Provider[];
	recommendations: Recommendation[];
}
