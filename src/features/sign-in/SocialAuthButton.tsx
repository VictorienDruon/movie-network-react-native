import { TouchableOpacity, useColorScheme } from "react-native";
import { useAssets } from "expo-asset";
import { createURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "@supabase/supabase-js";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { supabase } from "@/libs/supabase";
import { HStack, Image, Title } from "@/components/ui";

const SocialAuthButton = ({ provider }: { provider: Provider }) => {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";
	const { borderRadii } = useTheme<Theme>();
	const redirectTo = createURL("/");
	const [assets] = useAssets([
		require("../../../assets/google.png"),
		require("../../../assets/x-black.png"),
		require("../../../assets/x-white.png"),
	]);

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
		}
	};

	if (!assets) return null;

	const logo =
		provider === "google" ? assets[0] : isDark ? assets[1] : assets[2];
	const providerName = provider === "google" ? "Google" : "X";

	return (
		<TouchableOpacity
			style={{
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: 48,
				backgroundColor: isDark ? "white" : "black",
				borderRadius: borderRadii.xl,
			}}
			onPress={() => handleSignInPress(provider)}
		>
			<HStack alignItems="center" space={8}>
				<Image src={logo} alt={provider} width={16} height={16} />
				<Title
					fontSize={18}
					fontWeight="600"
					color={isDark ? "black" : "white"}
				>
					Sign in with {providerName}
				</Title>
			</HStack>
		</TouchableOpacity>
	);
};

export default SocialAuthButton;
