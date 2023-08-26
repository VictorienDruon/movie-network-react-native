import { Image } from "expo-image";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";

interface AvatarProps {
	size: keyof Theme["spacing"];
	src: string;
	alt: string;
}

export const Avatar = ({ src, size, alt }: AvatarProps) => {
	const { colors } = useTheme<Theme>();
	return (
		<Image
			source={src}
			style={{
				width: size,
				height: size,
				borderRadius: 100,
				borderWidth: 1,
				borderColor: colors["neutral-6"],
			}}
			alt={alt}
		/>
	);
};
