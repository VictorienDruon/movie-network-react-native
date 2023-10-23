import { AnimatableStringValue, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { tmdbConfig } from "@/libs/tmdb";
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
import Poster from "./types/Poster";

type PosterCardOrientation = "horizontal" | "vertical";
type PosterCardAction = "select" | "navigate";
type PosterCardSize = "sm" | "md" | "lg";
type PosterCardDecoration = "shadow" | "border";
type PosterCardTextPosition = "top" | "bottom";

interface PosterCardProps extends Omit<BoxProps, "id"> {
	poster: Poster;
	orientation?: PosterCardOrientation;
	action?: PosterCardAction;
	size?: PosterCardSize;
	decoration?: PosterCardDecoration;
	textPosition?: PosterCardTextPosition;
	rotate?: AnimatableStringValue;
}

const PosterCard = ({
	poster,
	orientation = "vertical",
	action = "navigate",
	size = "sm",
	decoration = "border",
	textPosition = "bottom",
	rotate,
	...props
}: PosterCardProps) => {
	const { id, title, posterPath, backdropPath, type } = poster;
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
					src={`${tmdbConfig.links.image}${
						imagesResolution[orientation][size]
					}${orientation === "vertical" ? posterPath : backdropPath}`}
					alt={`${title} poster`}
					borderRadius="sm"
					{...boxSizes[orientation][size]}
					{...boxOrientation[orientation]}
					{...(decoration === "border" && { ...boxBorder })}
				/>

				{textPosition === "top" && (
					<Box
						position="absolute"
						left={0}
						right={0}
						alignItems="center"
						{...imageSizes[size]}
					>
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
					</Box>
				)}

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
	[key in PosterCardOrientation]: { [key in PosterCardSize]: BoxProps };
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
	[key in PosterCardOrientation]: BoxProps;
} = {
	horizontal: { aspectRatio: 16 / 9 },
	vertical: { aspectRatio: 5 / 7 },
};

const imageSizes: { [key in PosterCardSize]: BoxProps } = {
	lg: { padding: 8 },
	md: { padding: 6 },
	sm: { padding: 4 },
};

const imagesResolution: {
	[key in PosterCardOrientation]: { [key in PosterCardSize]: string };
} = {
	horizontal: { lg: "/w1280", md: "/w1280", sm: "/w780" },
	vertical: { lg: "/w780", md: "/w500", sm: "/w342" },
};

const textSizes: { [key in PosterCardSize]: TextProps } = {
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

export default PosterCard;
