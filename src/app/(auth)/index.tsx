import { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "expo-router";
import { ErrorFallback, ErrorState } from "@/components/commons";
import { Heading, SubHeading, VStack } from "@/components/ui";
import { useOnboarding } from "@/providers/onboarding";
import AppleAuthButton from "@/features/sign-in/AppleAuthButton";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/libs/tmdb/api/trending";
import Poster from "@/features/poster-card/types/Poster";
import PosterCardsLayout from "@/features/poster-card/components/PosterCardsLayout";
import PosterCardsLayoutSkeleton from "@/features/poster-card/components/PosterCardsLayoutSkeleton";
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
					<PosterCardsLayoutSkeleton length={3} />
				) : (
					<TouchableWithoutFeedback>
						<PosterCardsLayout
							posters={query.data.results.slice(0, 3) as Poster[]}
						/>
					</TouchableWithoutFeedback>
				)}

				<VStack space={16}>
					<AppleAuthButton />

					<LegalDisclaimer />
				</VStack>
			</VStack>
		</ErrorBoundary>
	);
};

export default SignInScreen;
