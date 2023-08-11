import { supabase } from "..";
import { Database } from "../types/database.types";

type NewComment = Database["public"]["Tables"]["comments"]["Insert"];

export async function addComment(newComment: NewComment) {
	const { data, error } = await supabase.from("comments").insert(newComment);
	if (error) throw error;
	return data;
}
