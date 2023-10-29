import { useEffect } from "react";
import { Platform, TouchableOpacity, useColorScheme } from "react-native";
import { createURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAssets } from "expo-asset";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { Provider } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import {
	HStack,
	Heading,
	Image,
	SubHeading,
	Title,
	VStack,
} from "@/components/ui";

const SignInScreen = () => {
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

	const handleAppleSignInPress = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (credential.identityToken) {
				const { error } = await supabase.auth.signInWithIdToken({
					provider: "apple",
					token: credential.identityToken,
				});

				if (error)
					throw new Error("Error setting auth session: " + error.message);
			} else {
				throw new Error("Authentication failed: no identityToken");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		WebBrowser.warmUpAsync();
		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	return (
		<VStack flex={1} justifyContent="space-between" px={32} py={128} space={64}>
			<VStack space={16}>
				<Heading textAlign="center">Welcome to the Movie Network!</Heading>

				<SubHeading textAlign="center">Sign in to get started.</SubHeading>
			</VStack>

			<VStack space={16}>
				{assets && (
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: 48,
							backgroundColor: isDark ? "white" : "black",
							borderRadius: borderRadii.xl,
						}}
						onPress={() => handleSignInPress("google")}
					>
						<HStack alignItems="center" space={8}>
							<Image src={assets[0]} alt="Google" width={16} height={16} />
							<Title
								fontSize={18}
								fontWeight="600"
								color={isDark ? "black" : "white"}
							>
								Sign in with Google
							</Title>
						</HStack>
					</TouchableOpacity>
				)}

				{assets && (
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: 48,
							backgroundColor: isDark ? "white" : "black",
							borderRadius: borderRadii.xl,
						}}
						onPress={() => handleSignInPress("twitter")}
					>
						<HStack alignItems="center" space={8}>
							<Image
								src={isDark ? assets[1] : assets[2]}
								alt="X"
								width={16}
								height={16}
							/>
							<Title
								fontSize={18}
								fontWeight="600"
								color={isDark ? "black" : "white"}
							>
								Sign in with X
							</Title>
						</HStack>
					</TouchableOpacity>
				)}

				{Platform.OS === "ios" && (
					<AppleAuthentication.AppleAuthenticationButton
						buttonType={
							AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
						}
						buttonStyle={
							AppleAuthentication.AppleAuthenticationButtonStyle[
								isDark ? "WHITE" : "BLACK"
							]
						}
						cornerRadius={borderRadii.xl}
						style={{ width: "100%", height: 48 }}
						onPress={handleAppleSignInPress}
					/>
				)}
			</VStack>
		</VStack>
	);
};

export default SignInScreen;
