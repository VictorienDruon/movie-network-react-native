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
		8: 8,
		10: 10,
		12: 12,
		16: 16,
		20: 20,
		22: 22,
		24: 24,
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
		md: 16,
		lg: 24,
		full: 9999,
		default: 8,
	},
	textVariants: {
		header: {
			fontWeight: "700",
			fontSize: 20,
			color: "neutral-12",
		},
		title: {
			fontWeight: "600",
			fontSize: 16,
			color: "neutral-12",
		},
		subtitle: {
			fontWeight: "500",
			fontSize: 14,
			color: "neutral-11",
		},
		body: {
			fontWeight: "400",
			fontSize: 14,
			color: "neutral-12",
		},
		metadata: {
			fontWeight: "400",
			fontSize: 11,
			color: "neutral-11",
		},
		button: {
			fontWeight: "600",
			lineHeight: 0,
		},
	},
	colors: {
		...primary,
		...neutral,
		...blue,
	},
});

export const darkTheme: Theme = {
	...theme,
	colors: {
		...primaryDark,
		...neutralDark,
		...blueDark,
	},
};
