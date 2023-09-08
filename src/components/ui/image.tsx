import { useState } from "react";
import { Image as ExpoImage, ImageContentFit } from "expo-image";
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
import Skeleton from "./skeleton";
import { Box } from "./box";

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
	contentFit?: ImageContentFit;
	children?: React.ReactNode;
};

export const Image = ({
	src,
	alt,
	contentFit,
	children,
	...rest
}: ImageProps) => {
	const [isLoading, setIsLoading] = useState(src ? true : false);
	const props = useRestyle(restyleFunctions, rest);

	return (
		<Box position="relative">
			<ExpoImage
				source={src}
				alt={alt}
				contentFit={contentFit}
				onLoadEnd={() => setIsLoading(false)}
				{...props}
			>
				{children}
			</ExpoImage>

			{isLoading && <Skeleton position="absolute" {...props} />}
		</Box>
	);
};
