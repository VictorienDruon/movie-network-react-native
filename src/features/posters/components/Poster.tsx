import { AnimatableStringValue, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Box, BoxProps, TextProps, Title, Image, Blur } from "@/components/ui";

type PosterSize = "sm" | "md" | "lg";

export type Poster = {
	type: "movie" | "show";
	id: number;
	title: string;
	poster_path: string;
};

interface PosterProps extends BoxProps {
	poster: Poster;
	size: PosterSize;
	rotate?: AnimatableStringValue;
	shadow?: boolean;
}

export const Poster = ({
	poster,
	size,
	rotate,
	shadow = true,
	...props
}: PosterProps) => {
	const { type, id, title, poster_path } = poster;

	return (
		<Box
			position="relative"
			bg="neutral-3"
			borderRadius="md"
			style={{ transform: [{ rotate: rotate ? rotate : "0deg" }] }}
			{...(shadow && { ...boxShadow })}
			{...props}
		>
			<Link
				href={{
					pathname: `/(app)/${type}/[id]`,
					params: { id },
				}}
				asChild
			>
				<TouchableOpacity>
					<Image
						source={`https://image.tmdb.org/t/p/${imageSizes[size]}${poster_path}`}
						alt={title}
						alignItems="center"
						borderRadius="md"
						aspectRatio={5 / 7}
						{...boxSizes[size]}
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
					</Image>
				</TouchableOpacity>
			</Link>
		</Box>
	);
};

const imageSizes: { [key in PosterSize]: string } = {
	lg: "w500",
	md: "w342",
	sm: "w342",
};

const boxSizes: { [key in PosterSize]: BoxProps } = {
	lg: {
		height: 300,
		padding: 8,
	},
	md: {
		height: 225,
		padding: 6,
	},
	sm: {
		height: 180,
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

const boxShadow: BoxProps = {
	shadowColor: "black",
	shadowOffset: { width: 0, height: 15 },
	shadowOpacity: 0.2,
	shadowRadius: 15,
	elevation: 5,
};
