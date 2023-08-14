import * as LucideIcons from "lucide-react-native";

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
	return (
		<LucideIcon color={color} size={sizes[size]} fill={fill ? color : "none"} />
	);
};
