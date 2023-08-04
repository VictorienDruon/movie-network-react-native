import { useState } from "react";
import { useURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";

const useSignIn = (provider: Provider) => {
	const [isLoading, setIslLoading] = useState(false);
	const redirectTo = useURL();

	const handleSignInPress = async () => {
		try {
			setIslLoading(true);
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: { redirectTo },
			});
			if (error) throw new Error("Error getting auth url: " + error.message);
			const res = await WebBrowser.openAuthSessionAsync(data.url);
			if (res.type === "success") {
				const params = new URLSearchParams(res.url.split("#")[1]);
				const access_token = params.get("access_token");
				const refresh_token = params.get("refresh_token");
				if (!access_token || !refresh_token)
					throw new Error("Error retrieving tokens in url");
				const { error } = await supabase.auth.setSession({
					access_token,
					refresh_token,
				});
				if (error)
					throw new Error("Error setting auth session: " + error.message);
			} else throw new Error("Authentication failed: " + res.type);
		} catch (err) {
			console.error(err);
		} finally {
			setIslLoading(false);
		}
	};

	return { isLoading, handleSignInPress };
};

export default useSignIn;
