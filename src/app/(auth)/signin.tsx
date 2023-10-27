import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { createURL } from "expo-linking";
import { Provider } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { Button, Title, VStack } from "@/components/ui";

const SignInScreen = () => {
	const redirectTo = createURL("/");

	const handleSignInPress = async (provider: Provider) => {
		try {
			const {
				data: { url },
				error,
			} = await supabase.auth.signInWithOAuth({
				provider,
				options: { redirectTo },
			});

			if (error) throw new Error("Error getting auth url: " + error.message);

			const res = await WebBrowser.openAuthSessionAsync(url, redirectTo);

			if (res.type === "success") {
				const params = new URLSearchParams(res.url.split("#")[1]);
				const accessToken = params.get("access_token");
				const refreshToken = params.get("refresh_token");

				if (!accessToken || !refreshToken)
					throw new Error("Error retrieving tokens in url");

				const { error } = await supabase.auth.setSession({
					access_token: accessToken,
					refresh_token: refreshToken,
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
	}, []);

	return (
		<VStack
			flex={1}
			justifyContent="center"
			alignItems="center"
			px={16}
			py={64}
			space={16}
		>
			<Title>Sign In</Title>

			<Button onPress={() => handleSignInPress("google")}>
				Sign In with Google
			</Button>

			<Button onPress={() => handleSignInPress("twitter")}>
				Sign In with Twitter
			</Button>
		</VStack>
	);
};

export default SignInScreen;
