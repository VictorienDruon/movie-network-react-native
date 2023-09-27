import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useURL } from "expo-linking";
import { Provider } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { Button, Title, VStack } from "@/components/ui";

const SignInScreen = () => {
	const redirectTo = useURL();

	const handleSignInPress = async (provider: Provider) => {
		try {
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
		}
	};

	useEffect(() => {
		WebBrowser.warmUpAsync();
		return () => {
			WebBrowser.coolDownAsync();
		};
	});


	return (
		<VStack flex={1} justifyContent="center" alignItems="center" px={16} py={64} space={16}>
			<Title>Sign In</Title>

			<Button onPress={() => handleSignInPress("google")}>Sign In with Google</Button>

			<Button onPress={() => handleSignInPress("twitter")}>Sign In with Twitter</Button>
		</VStack>
	);
};

export default SignInScreen;
