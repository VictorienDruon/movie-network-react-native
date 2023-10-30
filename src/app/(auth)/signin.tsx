import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import * as WebBrowser from "expo-web-browser";
import { Heading, SubHeading, VStack } from "@/components/ui";
import SocialAuthButton from "@/features/sign-in/SocialAuthButton";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";
import { ErrorFallback } from "@/components/commons";

const SignInScreen = () => {
	useEffect(() => {
		WebBrowser.warmUpAsync();
		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<VStack
				flex={1}
				justifyContent="space-between"
				px={32}
				py={128}
				space={64}
			>
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
		</ErrorBoundary>
	);
};

export default SignInScreen;
