import { Image as ExpoImage } from "expo-image";
import {
	spacing,
	SpacingProps,
	layout,
	LayoutProps,
	border,
	BorderProps,
	composeRestyleFunctions,
	useRestyle,
} from "@shopify/restyle";
import { Theme } from "@/styles/theme";

type RestyleProps = SpacingProps<Theme> &
	LayoutProps<Theme> &
	BorderProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
	spacing,
	layout,
	border,
]);

type ImageProps = RestyleProps & {
	src: string;
	alt: string;
	onLoadEnd?: () => void;
	children?: React.ReactNode;
};

export const Image = ({
	src,
	alt,
	onLoadEnd,
	children,
	...rest
}: ImageProps) => {
	const props = useRestyle(restyleFunctions, rest);

	return (
		<ExpoImage source={src} alt={alt} onLoadEnd={onLoadEnd} {...props}>
			{children}
		</ExpoImage>
	);
};
