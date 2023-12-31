import { TouchableOpacity, useColorScheme } from "react-native";
import { useErrorBoundary } from "react-error-boundary";
import { useAssets } from "expo-asset";
import { createURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { supabase } from "@/libs/supabase";
import { HStack, Image, Title } from "@/components/ui";

const SocialAuthButton = ({}) => {
	const { showBoundary } = useErrorBoundary();
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";
	const { borderRadii } = useTheme<Theme>();
	const redirectTo = createURL("/");
	const [assets] = useAssets([require("../../../assets/google.png")]);

	const handleSignInPress = async () => {
		try {
			const {
				data: { url },
				error,
			} = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo },
			});

			if (error) throw error;

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

				if (error) throw error;
			} else if (res.type !== "dismiss" && res.type !== "cancel")
				throw new Error("Authentication failed");
		} catch (error) {
			showBoundary(error);
		}
	};

	if (!assets) return null;

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
			onPress={handleSignInPress}
		>
			<HStack alignItems="center" space={8}>
				<Image src={assets[0]} alt="google" width={16} height={16} />
				<Title
					fontSize={18}
					fontWeight="600"
					color={isDark ? "black" : "white"}
				>
					Sign in with Google
				</Title>
			</HStack>
		</TouchableOpacity>
	);
};

export default SocialAuthButton;
