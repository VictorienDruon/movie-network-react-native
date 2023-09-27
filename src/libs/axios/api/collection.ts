import { Poster } from "@/features/poster";
import { api } from "..";
import Collection from "../types/Collection";

export async function getCollection(id: string) {
	const params = new URLSearchParams({
		language: "en-US",
	});

	try {
		const { data } = await api.get(`/collection/${id}`, { params });

		const parts: Poster[] = data.parts
			.filter(
				(part: any) => part.poster_path !== null && part.backdrop_path !== null
			)
			.map((part: any) => ({
				id: part.id,
				title: part.title,
				poster_path: part.poster_path,
				backdrop_path: part.backdrop_path,
				type: part.media_type,
			}));

		const collection: Collection = {
			...data,
			parts,
		};

		return collection;
	} catch (error) {
		throw error;
	}
}
