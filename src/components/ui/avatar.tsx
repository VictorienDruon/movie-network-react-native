import { border, useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { getInitials } from "@/utils/texts";
import { Image } from "./image";
import { Heading, Title } from "./texts";
import { LinearGradient } from "expo-linear-gradient";

interface AvatarProps {
	src: string;
	name: string;
	size: keyof Theme["spacing"];
}

export const Avatar = ({ src, name, size }: AvatarProps) => {
	const { colors, borderRadii } = useTheme<Theme>();

	if (src)
		return (
			<Image
				src={src}
				alt={name}
				width={size}
				height={size}
				borderRadius="full"
				borderWidth={1}
				borderColor="neutral-6"
			/>
		);

	return (
		<LinearGradient
			colors={[colors["neutral-11"], colors["neutral-8"]]}
			start={{ x: 0.3, y: 1 }}
			end={{ x: 0.7, y: 0 }}
			locations={[0.1, 1]}
			style={{
				alignItems: "center",
				justifyContent: "center",
				width: size,
				height: size,
				borderRadius: borderRadii.full,
				borderWidth: 1,
				borderColor: colors["neutral-6"],
			}}
		>
			<Heading fontSize={0.4 * size} lineHeight={0.5 * size} color="white">
				{getInitials(name)}
			</Heading>
		</LinearGradient>
	);
};
