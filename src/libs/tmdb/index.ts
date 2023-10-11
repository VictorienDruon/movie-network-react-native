import { TMDB } from "tmdb-ts";
import { getSecret } from "@/libs/supabase/api/vault";

let tmdb: TMDB | null = null;

export async function getTmdbClient() {
	if (!tmdb) {
		const { data: token, error } = await getSecret("tmdb_access_token");

		if (error) throw error;

		tmdb = new TMDB(token);
	}

	return tmdb;
}
