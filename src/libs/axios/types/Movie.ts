import { Poster } from "@/features/poster";
import { Person } from "@/features/person";
import { Providers } from "./Providers";

interface Movie {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
	runtime: number;
	budget: number;
	revenue: number;
	collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	companies: string[];
	countries: string[];
	languages: string[];
	genres: {
		id: number;
		name: string;
	}[];
	cast: Person[];
	crew: Person[];
	recommendations: Poster[];
	videoKey: string;
	providers: Providers;
}

export default Movie;
