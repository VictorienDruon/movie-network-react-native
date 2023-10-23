import { createTheme } from "@shopify/restyle";
import {
	primary,
	primaryDark,
	neutral,
	neutralDark,
	blue,
	blueDark,
} from "./colors";

export type Theme = typeof theme;

export const theme = createTheme({
	spacing: {
		0: 0,
		2: 2,
		4: 4,
		6: 6,
		8: 8,
		10: 10,
		12: 12,
		16: 16,
		18: 18,
		20: 20,
		22: 22,
		24: 24,
		28: 28,
		32: 32,
		40: 40,
		48: 48,
		56: 56,
		64: 64,
		72: 72,
		80: 80,
		96: 96,
		128: 128,
		256: 256,
	},
	borderRadii: {
		none: 0,
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 24,
		full: 9999,
		default: 8,
	},
	textVariants: {
		header: {
			fontWeight: "700",
			fontSize: 20,
			lineHeight: 24,
			color: "neutral-12",
		},
		subheader: {
			fontWeight: "600",
			fontSize: 18,
			lineHeight: 22,
			color: "neutral-12",
		},
		title: {
			fontWeight: "600",
			fontSize: 16,
			lineHeight: 20,
			color: "neutral-12",
		},
		subtitle: {
			fontWeight: "500",
			fontSize: 14,
			lineHeight: 18,
			color: "neutral-11",
		},
		body: {
			fontWeight: "400",
			fontSize: 14,
			lineHeight: 18,
			color: "neutral-12",
		},
		metadata: {
			fontWeight: "400",
			fontSize: 11,
			lineHeight: 14,
			color: "neutral-11",
		},
		button: {
			fontWeight: "600",
		},
	},
	colors: {
		black: "#000000",
		white: "#FFFFFF",
		transparent: "transparent",
		...primary,
		...neutral,
		...blue,
	},
});

export const darkTheme: Theme = {
	...theme,
	colors: {
		...theme.colors,
		...primaryDark,
		...neutralDark,
		...blueDark,
	},
};
