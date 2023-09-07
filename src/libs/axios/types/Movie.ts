import { Collection } from "./Collection";
import { CastMember, CrewMember } from "./Credits";
import { Genre } from "./Genre";
import { Language, Country } from "./Locales";
import { Company } from "./Company";
import { Video } from "./Video";
import { Provider } from "./Providers";
import { Recommendation } from "./Recommendation";

export interface Movie {
	backdrop_path: string | null;
	id: number;
	overview: string;
	poster_path: string | null;
	release_date: string;
	title: string;
}

export interface MovieDetails extends Movie {
	belongs_to_collection: Collection;
	budget: number;
	genres: Genre[];
	production_companies: Company[];
	production_countries: Country[];
	revenue: number;
	runtime: number;
	spoken_languages: Language[];
	video: Video;
	cast: CastMember[];
	crew: CrewMember[];
	providers: Provider[];
	recommendations: Recommendation[];
}
