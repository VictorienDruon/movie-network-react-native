import { Image } from "expo-image";

interface AvatarProps {
	src: string;
	size: "sm" | "md" | "lg" | "xl";
	alt: string;
}

export const Avatar = ({ src, size, alt }: AvatarProps) => (
	<Image
		source={src}
		style={{ width: sizes[size], height: sizes[size], borderRadius: 100 }}
		alt={alt}
	/>
);

const sizes = {
	sm: 24,
	md: 40,
	lg: 56,
	xl: 72,
};
