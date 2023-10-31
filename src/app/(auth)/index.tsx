import { useEffect } from "react";
import { Linking, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "expo-router";
import { appConfig } from "@/config/app";
import { ErrorFallback, ErrorState } from "@/components/commons";
import {
	Box,
	Heading,
	Metadata,
	Skeleton,
	SubHeading,
	VStack,
} from "@/components/ui";
import { useOnboarding } from "@/providers/onboarding";
import SocialAuthButton from "@/features/sign-in/SocialAuthButton";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";
import PosterCard from "@/features/poster-card";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/libs/tmdb/api/trending";
import Poster from "@/features/poster-card/types/Poster";

const SignInScreen = () => {
	const { isOnboarded } = useOnboarding();

	const query = useQuery({
		queryKey: ["posters"],
		queryFn: () => getTrends("all", "day"),
	});

	useEffect(() => {
		if (!isOnboarded) {
			const timer = setTimeout(() => {
				router.push("/onboarding");
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [isOnboarded]);

	if (query.isError) return <ErrorState retry={query.refetch} />;

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
						Movie Network
					</Heading>

					<SubHeading textAlign="center">Sign in to get started.</SubHeading>
				</VStack>

				{query.isLoading ? (
					<Box position="relative" alignItems="center" maxHeight={280}>
						<Skeleton
							position="relative"
							right={60}
							width={100}
							aspectRatio={5 / 7}
							borderRadius="sm"
							style={{ transform: [{ rotate: "-4deg" }] }}
						/>
						<Skeleton
							position="relative"
							top={-100}
							left={60}
							width={100}
							aspectRatio={5 / 7}
							borderRadius="sm"
							style={{ transform: [{ rotate: "4deg" }] }}
						/>
						<Skeleton
							position="relative"
							top={-145}
							right={15}
							width={100}
							aspectRatio={5 / 7}
							borderRadius="sm"
						/>
					</Box>
				) : (
					<TouchableWithoutFeedback>
						<Box position="relative" alignItems="center" maxHeight={280}>
							<PosterCard
								poster={query.data.results[0] as Poster}
								size="sm"
								decoration="shadow"
								textPosition="top"
								right={60}
								rotate="-4deg"
							/>
							<PosterCard
								poster={query.data.results[1] as Poster}
								size="sm"
								decoration="shadow"
								textPosition="top"
								top={-100}
								left={60}
								rotate="4deg"
							/>
							<PosterCard
								poster={query.data.results[2] as Poster}
								size="sm"
								decoration="shadow"
								textPosition="top"
								top={-145}
								right={15}
							/>
						</Box>
					</TouchableWithoutFeedback>
				)}

				<VStack space={16}>
					<SocialAuthButton provider="google" />

					<SocialAuthButton provider="twitter" />

					{Platform.OS === "ios" && <AppleAuthButton />}

					<Metadata px={16} textAlign="center">
						{"By signing in, you agree to our "}
						<Metadata
							onPress={() => Linking.openURL(appConfig.links.site + "/terms")}
						>
							Terms of Service
						</Metadata>
						{" and "}
						<Metadata
							onPress={() => Linking.openURL(appConfig.links.site + "/privacy")}
						>
							Privacy Policy
						</Metadata>
						{"."}
					</Metadata>
				</VStack>
			</VStack>
		</ErrorBoundary>
	);
};

export default SignInScreen;
