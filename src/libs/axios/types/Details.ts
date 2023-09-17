import { Poster } from "@/features/poster";
import { Person } from "@/features/persons/components/Person";
import { Providers } from "@/features/providers";
import { Informations } from "@/features/informations";
import { Collection } from "@/features/collection";

interface Details {
	id: number;
	title?: string;
	release_year: string;
	poster_path?: string;
	backdrop_path?: string;
	overview?: string;
	runtime?: number;
	season_number?: number;
	collection?: Collection;
	genres?: {
		id: number;
		name: string;
	}[];
	cast?: Person[];
	crew?: Person[];
	recommendations?: Poster[];
	informations: Informations;
	videoKey?: string;
	providers?: {
		[key: string]: Providers;
	};
}

export default Details;
