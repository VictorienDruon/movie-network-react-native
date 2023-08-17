import { Image } from "expo-image";
import { Theme } from "@/styles/theme";

interface AvatarProps {
	size: keyof Theme["spacing"];
	src: string;
	alt: string;
}

export const Avatar = ({ src, size, alt }: AvatarProps) => (
	<Image
		source={src}
		style={{ width: size, height: size, borderRadius: 100 }}
		alt={alt}
	/>
);
