import { Poster } from "@/features/poster";

interface Person {
	id: number;
	name: string;
	movies: Poster[];
	tv: Poster[];
	directions: Poster[];
	writings: Poster[];
	productions: Poster[];
	biography: string;
	place_of_birth: string;
	birthday: string;
	deathday: string;
	department: string;
}

export default Person;
