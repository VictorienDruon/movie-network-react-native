import { supabase } from "..";

export function getSecret(secretName: string) {
	return supabase.rpc("read_secret", {
		secret_name: secretName,
	});
}
