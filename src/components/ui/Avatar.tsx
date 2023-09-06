import { Theme } from "@/styles/theme";
import { Image } from "./image";

interface AvatarProps {
	size: keyof Theme["spacing"];
	src: string;
	alt: string;
}

export const Avatar = ({ src, size, alt }: AvatarProps) => (
	<Image
		src={src}
		width={size}
		height={size}
		borderRadius="full"
		borderWidth={1}
		borderColor="neutral-6"
		alt={alt}
	/>
);
