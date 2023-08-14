import { createTheme } from "@shopify/restyle";
import { palette, paletteDark } from "./colors";

export type Theme = typeof theme;

export const theme = createTheme({
	spacing: {
		sm: 8,
		md: 16,
		lg: 24,
		xl: 40,
	},
	textVariants: {
		header: {
			fontWeight: "bold",
			fontSize: 34,
			lineHeight: 42.5,
			color: "accent12",
		},
		subheader: {
			fontWeight: "600",
			fontSize: 28,
			lineHeight: 36,
			color: "accent11",
		},
		title: {
			fontWeight: "bold",
			fontSize: 16,
			color: "gray12",
		},
		subtitle: {
			fontSize: 14,
			color: "gray11",
		},
		body: {
			fontSize: 16,
			color: "gray12",
		},
		metadata: {
			fontSize: 12,
			color: "gray11",
		},
		defaults: {
			fontSize: 16,
			color: "gray12",
		},
	},
	colors: palette,
});

export const darkTheme: Theme = {
	...theme,
	colors: paletteDark,
};
