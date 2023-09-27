import { AnimatableStringValue, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { usePosters } from "@/providers/posters";
import {
	VStack,
	Image,
	Body,
	BoxProps,
	Box,
	Icon,
	Blur,
	Title,
	TextProps,
} from "@/components/ui";

export type Poster = {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	type: "movie" | "tv" | "collection";
};

type PosterOrientation = "horizontal" | "vertical";
type PosterAction = "select" | "navigate";
type PosterSize = "sm" | "md" | "lg";
type PosterDecoration = "shadow" | "border";
type PosterTextPosition = "top" | "bottom";

interface PosterProps extends Omit<BoxProps, "id"> {
	poster: Poster;
	orientation?: PosterOrientation;
	action?: PosterAction;
	size?: PosterSize;
	decoration?: PosterDecoration;
	textPosition?: PosterTextPosition;
	rotate?: AnimatableStringValue;
}

export const Poster = ({
	poster,
	orientation = "vertical",
	action = "navigate",
	size = "sm",
	decoration = "border",
	textPosition = "bottom",
	rotate,
	...props
}: PosterProps) => {
	const { id, title, poster_path, backdrop_path, type } = poster;
	const context = usePosters();

	const handlePress = () => {
		action === "select"
			? context.toggle(poster)
			: router.push(
					type === "collection"
						? {
								pathname: `/collection/[id]`,
								params: { id: id },
						  }
						: {
								pathname: `/media/[type]/[id]`,
								params: { type, id: id },
						  }
			  );
	};

	return (
		<VStack
			position="relative"
			alignItems="center"
			space={2}
			style={[rotate && { transform: [{ rotate: rotate }] }]}
			{...boxSizes[orientation][size]}
			{...(decoration === "shadow" && { ...boxShadow })}
			{...props}
		>
			<TouchableOpacity onPress={handlePress}>
				<Image
					src={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}${
						imagesResolution[orientation][size]
					}${orientation === "vertical" ? poster_path : backdrop_path}`}
					alt={`${title} poster`}
					alignItems="center"
					borderRadius="sm"
					{...boxSizes[orientation][size]}
					{...boxOrientation[orientation]}
					{...imageSizes[size]}
					{...(decoration === "border" && { ...boxBorder })}
				>
					{textPosition === "top" && (
						<Blur intensity={15} tint="dark" borderRadius="full">
							<Title
								color="white"
								numberOfLines={1}
								ellipsizeMode="tail"
								{...textSizes[size]}
							>
								{title}
							</Title>
						</Blur>
					)}
				</Image>

				{action === "select" && context.isSelected(id, type) && (
					<Box
						position="absolute"
						justifyContent="center"
						alignItems="center"
						{...boxSizes[orientation][size]}
						{...boxOrientation[orientation]}
					>
						<Box
							width="100%"
							height="100%"
							backgroundColor="primary-5"
							opacity={0.6}
							borderRadius="sm"
						/>
						<Box
							position="absolute"
							justifyContent="center"
							alignItems="center"
							width={28}
							height={28}
							bg="primary-9"
							borderRadius="full"
							borderWidth={1}
							borderColor="white"
						>
							<Icon name="Check" size={20} color="white" />
						</Box>
					</Box>
				)}
			</TouchableOpacity>

			{textPosition === "bottom" && (
				<Body
					fontSize={13}
					textAlign="center"
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{title}
				</Body>
			)}
		</VStack>
	);
};

const boxSizes: {
	[key in PosterOrientation]: { [key in PosterSize]: BoxProps };
} = {
	horizontal: {
		lg: { width: 300 },
		md: { width: 250 },
		sm: { width: 200 },
	},
	vertical: {
		lg: { width: 200 },
		md: { width: 150 },
		sm: { width: 100 },
	},
};

const boxOrientation: {
	[key in PosterOrientation]: BoxProps;
} = {
	horizontal: { aspectRatio: 16 / 9 },
	vertical: { aspectRatio: 5 / 7 },
};

const imageSizes: { [key in PosterSize]: BoxProps } = {
	lg: { padding: 8 },
	md: { padding: 6 },
	sm: { padding: 4 },
};

const imagesResolution: {
	[key in PosterOrientation]: { [key in PosterSize]: string };
} = {
	horizontal: { lg: "/w1280", md: "/w1280", sm: "/w780" },
	vertical: { lg: "/w780", md: "/w500", sm: "/w342" },
};

const textSizes: { [key in PosterSize]: TextProps } = {
	lg: {
		px: 10,
		py: 4,
		fontSize: 14,
	},
	md: {
		px: 8,
		py: 2,
		fontSize: 12,
	},
	sm: {
		px: 6,
		fontSize: 8,
	},
};

const boxBorder: BoxProps = {
	borderWidth: 1,
	borderColor: "neutral-6",
};

const boxShadow: BoxProps = {
	backgroundColor: "neutral-3",
	borderRadius: "sm",
	shadowColor: "black",
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.15,
	shadowRadius: 15,
	elevation: 5,
};
