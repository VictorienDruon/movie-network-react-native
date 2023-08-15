import { Stack } from "expo-router";
import { SessionProvider } from "@/providers/session";
import { ThemeProvider } from "@/providers/theme";

const RootLayout = () => (
	<SessionProvider>
		<ThemeProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</ThemeProvider>
	</SessionProvider>
);

export default RootLayout;
