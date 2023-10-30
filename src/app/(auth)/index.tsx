import { useEffect } from "react";
import { Linking, Platform } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "expo-router";
import { appConfig } from "@/config/app";
import { ErrorFallback } from "@/components/commons";
import {
	Box,
	Heading,
	Link,
	Metadata,
	SubHeading,
	VStack,
} from "@/components/ui";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import SocialAuthButton from "@/features/sign-in/SocialAuthButton";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";

const SignInScreen = () => {
	const { isOnboarded } = useOnboarding();

	useEffect(() => {
		if (!isOnboarded) {
			const timer = setTimeout(() => {
				router.push("/onboarding");
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [isOnboarded]);

	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<VStack
				flex={1}
				justifyContent="space-between"
				px={32}
				py={96}
				space={64}
			>
				<VStack space={16}>
					<Heading
						fontSize={32}
						fontWeight="800"
						textAlign="center"
						lineHeight={40}
					>
						Movie Network
					</Heading>

					<SubHeading textAlign="center">Sign in to get started.</SubHeading>
				</VStack>

				<VStack space={16}>
					<SocialAuthButton provider="google" />

					<SocialAuthButton provider="twitter" />

					{Platform.OS === "ios" && <AppleAuthButton />}

					<Box px={32}>
						<Metadata textAlign="center">
							By signing in, you agree to our{" "}
							<Metadata
								onPress={() => Linking.openURL(appConfig.links.site + "/terms")}
							>
								Terms of Service
							</Metadata>
							{" and "}
							<Metadata
								onPress={() =>
									Linking.openURL(appConfig.links.site + "/privacy")
								}
							>
								Privacy Policy
							</Metadata>
							.
						</Metadata>
					</Box>
				</VStack>
			</VStack>
		</ErrorBoundary>
	);
};

export default SignInScreen;
