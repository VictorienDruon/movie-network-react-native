import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const ONBOARDING_KEY = "onboarding";

interface OnboardingContextType {
	isOnboarded: boolean;
	completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
	isOnboarded: false,
	completeOnboarding: () => {},
});

export const OnboardingProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const [isOnboarded, setIsOnboarded] = useState(false);

	useEffect(() => {
		const checkOnboardingStatus = async () => {
			const value = await AsyncStorage.getItem(ONBOARDING_KEY);
			setIsOnboarded(value === "true");
		};

		checkOnboardingStatus();
	}, []);

	const completeOnboarding = async () => {
		setIsOnboarded(true);
		await AsyncStorage.setItem(ONBOARDING_KEY, "true");
	};

	const value: OnboardingContextType = {
		isOnboarded,
		completeOnboarding,
	};

	return (
		<OnboardingContext.Provider value={value}>
			{children}
		</OnboardingContext.Provider>
	);
};

export const useOnboarding = () => {
	const { isOnboarded, completeOnboarding } = useContext(OnboardingContext);

	return {
		isOnboarded,
		completeOnboarding,
	};
};
