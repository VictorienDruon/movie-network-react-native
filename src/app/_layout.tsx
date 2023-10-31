import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/providers/session";
import { ThemeProvider } from "@/providers/theme";
const queryClient = new QueryClient();

const RootLayout = () => (
	<QueryClientProvider client={queryClient}>
		<SessionProvider>
			<ThemeProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</ThemeProvider>
		</SessionProvider>
	</QueryClientProvider>
);

export default RootLayout;
