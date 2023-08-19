import { supabase } from "..";
import { Database } from "../types/database.types";

type NewLike = Database["public"]["Tables"]["likes"]["Insert"] & {
	userHasLikedPost: boolean;
};

export async function toggleLike(newLike: NewLike) {
	const { userHasLikedPost, ...like } = newLike;

	if (userHasLikedPost) {
		const { data, error } = await supabase.from("likes").delete().match(like);

		if (error) throw error;

		return data;
	} else {
		const { data, error } = await supabase.from("likes").insert(like);

		if (error) throw error;

		return data;
	}
}
