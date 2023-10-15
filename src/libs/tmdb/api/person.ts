import { PersonMovieCrew, PersonTvShowCrew } from "tmdb-ts";
import Poster from "@/features/poster-card/types/Poster";
import { getTmdbClient } from "..";
import { isValidPoster } from "../utils/filter";
import { formatPoster } from "../utils/map";

export interface PersonDetails {
	id: number;
	name: string;
	department: string;
	birthday: string;
	deathday: string;
	placeOfBirth: string;
	biography: string;
	movies: Poster[];
	shows: Poster[];
	directed: Poster[];
	written: Poster[];
	composed: Poster[];
}

export async function getPerson(id: string): Promise<PersonDetails> {
	try {
		const tmdb = await getTmdbClient();

		const person = await tmdb.people.details(parseInt(id));
		const movieCredits = await tmdb.people.movieCredits(parseInt(id));
		const showCredits = await tmdb.people.tvShowCredits(parseInt(id));
		const combinedCrewCredits = [...movieCredits.crew, ...showCredits.crew];

		const movies = movieCredits.cast.filter(isValidPoster).map(formatPoster);
		const shows = showCredits.cast.filter(isValidPoster).map(formatPoster);
		const directed = filterAndMapCrewCredits(combinedCrewCredits, "Director");
		const written = filterAndMapCrewCredits(combinedCrewCredits, "Screenplay");
		const composed = filterAndMapCrewCredits(
			combinedCrewCredits,
			"Original Music Composer"
		);

		return {
			id: person.id,
			name: person.name,
			department: person.known_for_department,
			birthday: person.birthday,
			deathday: person.deathday,
			placeOfBirth: person.place_of_birth,
			biography: person.biography,
			movies,
			shows,
			directed,
			written,
			composed,
		};
	} catch (error) {
		throw error;
	}
}

function filterAndMapCrewCredits<T extends PersonMovieCrew | PersonTvShowCrew>(
	credits: T[],
	job: string
): Poster[] {
	return credits
		.filter((credit) => credit.job === job && isValidPoster(credit))
		.map(formatPoster);
}
