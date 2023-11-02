import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "expo-router";
import { ErrorFallback, ErrorState } from "@/components/commons";
import { Heading, SubHeading, VStack } from "@/components/ui";
import { useOnboarding } from "@/providers/onboarding";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/libs/tmdb/api/trending";
import Poster from "@/features/poster-card/types/Poster";
import PosterCardsLayout from "@/features/poster-card/components/PosterCardsLayout";
import PosterCardsLayoutSkeleton from "@/features/poster-card/components/PosterCardsLayoutSkeleton";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";
import GoogleAuthButton from "@/features/sign-in/GoogleAuthButton";
import LegalDisclaimer from "@/features/sign-in/LegalDisclaimer";

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
				py={96}
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
					<PosterCardsLayoutSkeleton length={2} />
				) : (
					<PosterCardsLayout
						posters={query.data.results.slice(0, 2) as Poster[]}
						action="none"
					/>
				)}

				<VStack alignItems="center" space={16}>
					{Platform.OS === "ios" ? <AppleAuthButton /> : <GoogleAuthButton />}

					<LegalDisclaimer />
				</VStack>
			</VStack>
		</ErrorBoundary>
	);
};

export default SignInScreen;
