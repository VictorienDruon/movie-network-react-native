import { TouchableOpacity } from "react-native";
import { Link as ExpoLink } from "expo-router";
import { Href } from "expo-router/build/link/href";

interface LinkProps {
	href?: Href;
	children: React.ReactNode;
}

export const Link = ({ href, children }: LinkProps) => {
	if (!href) return <>{children}</>;

	return (
		<ExpoLink href={href} asChild>
			<TouchableOpacity>{children}</TouchableOpacity>
		</ExpoLink>
	);
};
