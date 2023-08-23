import { supabase } from "..";

export async function getOne(id: string) {
	const { data: profile, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;

	return profile;
}
