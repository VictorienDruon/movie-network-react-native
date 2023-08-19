import { primary, primaryDark, neutral, neutralDark } from "./colors";

export const theme = {
	dark: false,
	colors: {
		primary: primary["primary-9"], // Tab icons
		background: neutral["neutral-1"], // Main backgound
		card: neutral["neutral-1"], // Tab and Header background
		text: neutral["neutral-12"], // Header titles
		border: neutral["neutral-6"], // Tab borders
		notification: primary["primary-9"], // Tab Navigator badge
	},
};

export const darkTheme = {
	dark: true,
	colors: {
		primary: primaryDark["primary-9"],
		background: neutralDark["neutral-1"],
		card: neutralDark["neutral-1"],
		text: neutralDark["neutral-12"],
		border: neutralDark["neutral-6"],
		notification: primaryDark["primary-5"],
	},
};
