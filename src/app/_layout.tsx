import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { SessionProvider } from "@/providers/session";
import { ThemeProvider } from "@shopify/restyle";
import { theme, darkTheme } from "@/styles/themes";

const RootLayout = () => {
	const colorScheme = useColorScheme();

	return (
		<SessionProvider>
			<ThemeProvider theme={colorScheme === "dark" ? darkTheme : theme}>
				<Stack screenOptions={{ headerShown: false }} />
			</ThemeProvider>
		</SessionProvider>
	);
};

export default RootLayout;
