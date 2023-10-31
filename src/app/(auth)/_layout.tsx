import { Stack } from "expo-router";
import { OnboardingProvider } from "@/providers/onboarding";

const AuthLayout = () => {
	return (
		<OnboardingProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="onboarding" options={{ presentation: "modal" }} />
			</Stack>
		</OnboardingProvider>
	);
};

export default AuthLayout;
