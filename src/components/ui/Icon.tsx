import * as LucideIcons from "lucide-react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/providers/theme/styles/restyleThemes";

interface IconProps {
	name: string;
	size: "sm" | "md" | "lg" | "xl";
	color: string;
	fill?: boolean;
}

const sizes = {
	sm: 16,
	md: 20,
	lg: 24,
	xl: 28,
};

export const Icon = ({ name, size, color, fill = false }: IconProps) => {
	const LucideIcon = LucideIcons[name];
	const { colors } = useTheme<Theme>();
	const effectiveColor = colors[color] ?? color;

	return (
		<LucideIcon
			size={sizes[size]}
			color={effectiveColor}
			fill={fill ? effectiveColor : "none"}
		/>
	);
};
