import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { ThemeProvider as RestyleThemeProvider } from "@shopify/restyle";
import * as Nav from "./styles/navThemes";
import * as Restyle from "./styles/restyleThemes";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<NavThemeProvider value={isDark ? Nav.darkTheme : Nav.theme}>
			<RestyleThemeProvider theme={isDark ? Restyle.darkTheme : Restyle.theme}>
				{children}
			</RestyleThemeProvider>
		</NavThemeProvider>
	);
};
