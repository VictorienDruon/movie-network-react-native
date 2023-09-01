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
	source: string;
	alt: string;
	onLoadEnd?: () => void;
	children?: React.ReactNode;
};

export const Image = ({
	source,
	alt,
	onLoadEnd,
	children,
	...rest
}: ImageProps) => {
	const props = useRestyle(restyleFunctions, rest);

	return (
		<ExpoImage source={source} alt={alt} onLoadEnd={onLoadEnd} {...props}>
			{children}
		</ExpoImage>
	);
};
