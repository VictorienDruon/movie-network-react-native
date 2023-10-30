import { useEffect } from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Heading, SubHeading, VStack } from "@/components/ui";
import SocialAuthButton from "@/features/sign-in/SocialAuthButton";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";

const SignInScreen = () => {
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
				<SocialAuthButton provider="google" />

				<SocialAuthButton provider="twitter" />

				{Platform.OS === "ios" && <AppleAuthButton />}
			</VStack>
		</VStack>
	);
};

export default SignInScreen;
