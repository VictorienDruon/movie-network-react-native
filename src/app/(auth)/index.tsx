import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "expo-router";
import { ErrorFallback } from "@/components/commons";
import {
	Heading,
	Link,
	Separator,
	SubHeading,
	Title,
	VStack,
} from "@/components/ui";
import { useOnboarding } from "@/providers/onboarding";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";
import GoogleAuthButton from "@/features/sign-in/GoogleAuthButton";
import LegalDisclaimer from "@/features/sign-in/LegalDisclaimer";
import PosterPreview from "@/features/poster-card/components/PosterPreview";

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
				pt={96}
				pb={64}
				space={16}
			>
				<VStack space={16}>
					<Heading
						fontSize={32}
						fontWeight="800"
						textAlign="center"
						lineHeight={40}
					>
						Get started
					</Heading>

					<SubHeading textAlign="center">
						Sign in to access all Movie Network features
					</SubHeading>
				</VStack>

				<PosterPreview />

				<VStack space={24}>
					<VStack alignItems="center" space={12}>
						{Platform.OS === "ios" ? <AppleAuthButton /> : <GoogleAuthButton />}

						<Separator />

						<Link href="/explore">
							<Title textAlign="center">Or sign in later</Title>
						</Link>
					</VStack>

					<LegalDisclaimer />
				</VStack>
			</VStack>
		</ErrorBoundary>
	);
};

export default SignInScreen;
