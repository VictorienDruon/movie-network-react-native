import { Theme, theme } from "@/styles/theme";
import * as Icons from "lucide-react-native";
import { icons } from "lucide-react";

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
	color = "neutral-8",
	size,
	strokeWidth,
	customColor,
	fill,
}: IconProps) => {
	const LucideIcon = Icons[name];
	const effectiveColor = customColor ?? theme.colors[color];

	return (
		<LucideIcon
			color={effectiveColor}
			size={size}
			strokeWidth={strokeWidth}
			fill={fill ? effectiveColor : "none"}
		/>
	);
};
