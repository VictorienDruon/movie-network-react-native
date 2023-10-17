import * as Icons from "lucide-react-native";
import { icons } from "lucide-react";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";

export interface IconProps {
	name: keyof typeof icons;
	color?: keyof Theme["colors"];
	size?: keyof Theme["spacing"];
	strokeWidth?: number;
	customColor?: string;
	fill?: boolean;
}

export const Icon = ({
	name,
	color = "neutral-9",
	size,
	strokeWidth,
	customColor,
	fill,
}: IconProps) => {
	const { colors } = useTheme<Theme>();
	const LucideIcon = Icons[name];
	const effectiveColor = customColor ?? colors[color];

	return (
		<LucideIcon
			color={effectiveColor}
			size={size}
			strokeWidth={strokeWidth}
			fill={fill ? effectiveColor : "none"}
		/>
	);
};
