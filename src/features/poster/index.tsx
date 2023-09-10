import { TouchableOpacity } from "react-native";
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
	type: "movie" | "show";
};

type PosterSize = "sm" | "md" | "lg";

interface PosterProps extends Omit<BoxProps, "id"> {
	poster: Poster;
	action?: "select" | "navigate";
	size?: PosterSize;
	textPosition?: "top" | "bottom";
}

export const Poster = ({
	poster,
	action = "navigate",
	size = "sm",
	textPosition = "bottom",
	...props
}: PosterProps) => {
	const { id, title, poster_path, type } = poster;
	const context = usePosters();

	const handlePress = () => {
		action === "select"
			? context.toggle(poster)
			: router.push({
					pathname: `/(app)/${type}/[id]`,
					params: { id },
			  });
	};

	return (
		<VStack
			position="relative"
			alignItems="center"
			space={2}
			{...boxSizes[size]}
			{...props}
		>
			<TouchableOpacity onPress={handlePress}>
				<Image
					src={`https://image.tmdb.org/t/p/w185${poster_path}`}
					alt={`${title} poster`}
					aspectRatio={5 / 7}
					alignItems="center"
					borderRadius="sm"
					borderWidth={1}
					borderColor="neutral-6"
					{...boxSizes[size]}
					{...imageSizes[size]}
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

				{action === "select" && context.isSelected(id) && (
					<Box
						position="absolute"
						justifyContent="center"
						alignItems="center"
						width={100}
						aspectRatio={5 / 7}
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

const boxSizes: { [key in PosterSize]: BoxProps } = {
	lg: {
		width: 200,
	},
	md: {
		width: 150,
	},
	sm: {
		width: 100,
	},
};

const imageSizes: { [key in PosterSize]: BoxProps } = {
	lg: {
		padding: 8,
	},
	md: {
		padding: 6,
	},
	sm: {
		padding: 4,
	},
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
		py: 2,
		fontSize: 8,
	},
};
