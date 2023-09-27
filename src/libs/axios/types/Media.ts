import Person from "@/features/person-card/types/Person";
import Poster from "@/features/poster-card/types/Poster";
import Provider from "@/features/provider-icon/types/Provider";

interface Media {
	id: number;
	title: string;
	release_date?: string;
	poster_path?: string;
	backdrop_path?: string;
	overview?: string;
	runtime?: number;
	season_number?: number;
	collection?: Poster;
	genres?: {
		id: number;
		name: string;
	}[];
	companies?: string[];
	countries?: string[];
	created_by?: string[];
	languages?: string[];
	budget?: number;
	revenue?: number;
	last_episode_to_air?: {
		season_number: number;
		episode_number: number;
		name: string;
	};
	in_production?: boolean;
	cast?: Person[];
	crew?: Person[];
	recommendations?: Poster[];
	videoKey?: string;
	providers?: {
		[key: string]: {
			link: string;
			flatrate: Provider[];
			buy: Provider[];
			rent: Provider[];
		};
	};
}

export default Media;
