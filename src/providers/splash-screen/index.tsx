import { ReactNode, createContext, useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useSession } from "@/providers/session";

SplashScreen.preventAutoHideAsync();

const SplashScreenContext = createContext(null);

export const SplashScreenProvider = ({ children }: { children: ReactNode }) => {
	const { isSessionLoaded } = useSession();

	useEffect(() => {
		if (isSessionLoaded) {
			const timeout = setTimeout(() => {
				SplashScreen.hideAsync();
			}, 1000);

			return () => clearTimeout(timeout);
		}
	}, [isSessionLoaded]);

	return (
		<SplashScreenContext.Provider value={null}>
			{children}
		</SplashScreenContext.Provider>
	);
};
