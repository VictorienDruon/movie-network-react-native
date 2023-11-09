import { Insets, TouchableOpacity } from "react-native";
import { Link as ExpoLink } from "expo-router";
import { Href } from "expo-router/build/link/href";

interface LinkProps {
	href?: Href;
	hitSlop?: Insets;
	children: React.ReactNode;
}

export const Link = ({ href, hitSlop, children }: LinkProps) => {
	if (!href) return <>{children}</>;

	return (
		<ExpoLink href={href} asChild>
			<TouchableOpacity hitSlop={hitSlop}>{children}</TouchableOpacity>
		</ExpoLink>
	);
};
