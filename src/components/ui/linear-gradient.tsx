import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";

export const LinearGradient = () => {
	const { colors } = useTheme<Theme>();

	return (
		<ExpoLinearGradient
			colors={[colors["neutral-1"], "transparent"]}
			start={{ x: 0, y: 1 }}
			end={{ x: 0, y: 0 }}
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				bottom: -2,
				height: 64,
			}}
		/>
	);
};
