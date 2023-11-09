import { Platform } from "react-native";
import { router } from "expo-router";
import { icons } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding";
import {
	Body,
	Box,
	Button,
	HStack,
	Heading,
	Icon,
	SubHeading,
	VStack,
} from "@/components/ui";

interface Feature {
	icon: keyof typeof icons;
	title: string;
	description: string;
}

const features: Feature[] = [
	{
		icon: "ClipboardList",
		title: "Watchlist",
		description:
			"Keep track of all the movies and shows you want to watch in one place.",
	},
	{
		icon: "Compass",
		title: "Explore",
		description:
			"Discover the movies and shows that everyone is talking about.",
	},
	{
		icon: "MessageSquare",
		title: "Feed",
		description: "Read and write posts about your favorite movies and shows.",
	},
];

const OnboardingScreen = () => {
	const { completeOnboarding } = useOnboarding();

	const handleClose = async () => {
		completeOnboarding();
		router.back();
	};

	return (
		<VStack
			flex={1}
			space={64}
			px={24}
			pt={Platform.OS === "ios" ? 64 : 96}
			pb={64}
			justifyContent="space-between"
		>
			<Heading
				fontSize={32}
				fontWeight="800"
				textAlign="center"
				lineHeight={40}
			>
				Welcome to Movie Network!
			</Heading>

			<VStack flex={1} space={40}>
				{features.map((feature) => (
					<HStack space={16} key={feature.title}>
						<Box mt={2}>
							<Icon name={feature.icon} size={40} color="primary-10" />
						</Box>
						<VStack space={4} flex={1}>
							<SubHeading>{feature.title}</SubHeading>
							<Body>{feature.description}</Body>
						</VStack>
					</HStack>
				))}
			</VStack>

			<Box pt={16}>
				<Button size="lg" height={56} variant="primary" onPress={handleClose}>
					Get started
				</Button>
			</Box>
		</VStack>
	);
};

export default OnboardingScreen;
