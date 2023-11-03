import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/providers/session";
import { ThemeProvider } from "@/providers/theme";
import { SplashScreenProvider } from "@/providers/splash-screen";

const queryClient = new QueryClient();

const RootLayout = () => (
	<QueryClientProvider client={queryClient}>
		<SessionProvider>
			<ThemeProvider>
				<SplashScreenProvider>
					<Stack screenOptions={{ headerShown: false }} />
				</SplashScreenProvider>
			</ThemeProvider>
		</SessionProvider>
	</QueryClientProvider>
);

export default RootLayout;
