import { Poster } from "@/features/poster";

interface Person {
	id: number;
	name: string;
	movies: Poster[];
	shows: Poster[];
	directed: Poster[];
	written: Poster[];
	composed: Poster[];
	biography: string;
	place_of_birth: string;
	birthday: string;
	deathday: string;
	department: string;
}

export default Person;
