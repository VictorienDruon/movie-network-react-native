import Poster from "@/features/poster-card/types/Poster";


interface Collection {
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	parts: Poster[];
}

export default Collection;
