import {
	BelongsToCollection,
	Cast,
	Crew,
	Movie,
	Recommendation,
	Person as TmdbPerson,
	TV,
} from "tmdb-ts";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import Region from "@/features/region-card/types/Region";
import { getCountry } from "iso-3166-1-alpha-2";
import { tmdbConfig } from "..";

export function formatPoster(
	media: Movie | TV | Recommendation | BelongsToCollection
): Poster {
	let title: string;
	let type: "movie" | "tv" | "collection";

	if ("title" in media) {
		title = media.title;
		type = "movie";
	} else {
		title = media.name;
		type = "first_air_date" in media ? "tv" : "collection";
	}

	return {
		id: media.id.toString(),
		title,
		posterPath: media.poster_path,
		backdropPath: media.backdrop_path,
		type,
	};
}

export function formatPerson(person: TmdbPerson | Cast | Crew): Person {
	let role: string;

	if ("character" in person) {
		role = person.character;
	} else if ("roles" in person) {
		role = person.roles[0].character;
	} else if ("job" in person) {
		role = person.job;
	} else if ("jobs" in person) {
		role = person.jobs[0].job;
	}

	return {
		id: person.id.toString(),
		name: person.name,
		role,
		avatarUrl: `${tmdbConfig.links.image}/w185${person.profile_path}`,
		link: `/person/${person.id}`,
	};
}

export function formatRegion(code: string): Region {
	return {
		name: getCountry(code),
		code,
		flagUrl: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
	};
}

export function extractName<T extends { name: string }>(object: T): string {
	return object.name;
}
