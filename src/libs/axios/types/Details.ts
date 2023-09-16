import { CountryData } from "emoji-flags";
import { Poster } from "@/features/poster";
import { Person } from "@/features/person";
import { ProvidersByRegion } from "./Providers";

interface Details {
	id: number;
	title?: string;
	poster_path?: string;
	backdrop_path?: string;
	overview?: string;
	release_date?: string;
	last_episode_to_air?: {
		season_number: number;
		episode_number: number;
		name: string;
	};
	in_production?: boolean;
	runtime?: number;
	budget?: number;
	revenue?: number;
	collection?: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	companies?: string[];
	countries?: string[];
	languages?: string[];
	genres?: {
		id: number;
		name: string;
	}[];
	cast?: Person[];
	crew?: Person[];
	recommendations?: Poster[];
	videoKey?: string;
	providers?: ProvidersByRegion;
	providersRegions?: CountryData[];
	defaultRegion?: CountryData;
}

export default Details;
