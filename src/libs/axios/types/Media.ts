import { Poster } from "@/features/poster";
import { CreditMember } from "@/features/credit-member";
import { Providers } from "@/features/providers";

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
	cast?: CreditMember[];
	crew?: CreditMember[];
	recommendations?: Poster[];
	videoKey?: string;
	providers?: {
		[key: string]: Providers;
	};
}

export default Media;
