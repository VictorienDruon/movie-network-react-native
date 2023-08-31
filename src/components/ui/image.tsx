import { Image as ExpoImage } from "expo-image";
import {
	layout,
	LayoutProps,
	border,
	BorderProps,
	composeRestyleFunctions,
	useRestyle,
} from "@shopify/restyle";
import { Theme } from "@/styles/theme";

type RestyleProps = LayoutProps<Theme> & BorderProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
	layout,
	border,
]);

type ImageProps = RestyleProps & {
	source: string;
	children: React.ReactNode;
};

export const Image = ({ source, children, ...rest }: ImageProps) => {
	const props = useRestyle(restyleFunctions, rest);

	return (
		<ExpoImage source={source} {...props}>
			{children}
		</ExpoImage>
	);
};
