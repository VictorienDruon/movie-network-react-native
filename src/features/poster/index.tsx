import { BlurView } from "expo-blur";
import { Box, BoxProps, TextProps, Title, Image } from "@/components/ui";
import { AnimatableStringValue } from "react-native";

type PosterSize = "sm" | "md" | "lg";

export type Poster = {
	type: "movie" | "tv";
	id: number;
	title: string;
	posterPath: string;
};

interface PosterProps extends BoxProps {
	poster: Poster;
	size: PosterSize;
	rotate?: AnimatableStringValue;
}

export const Poster = ({ poster, size, rotate, ...props }: PosterProps) => {
	const { id, title, posterPath } = poster;

	return (
		<Box
			position="relative"
			height="100%"
			aspectRatio={5 / 7}
			bg="neutral-3"
			borderRadius="md"
			shadowColor="black"
			shadowOffset={{ width: 0, height: 15 }}
			shadowOpacity={0.3}
			shadowRadius={15}
			elevation={5}
			style={{ transform: [{ rotate: rotate ? rotate : "0deg" }] }}
			{...props}
		>
			<Image
				source={`https://image.tmdb.org/t/p/original${posterPath}`}
				flex={1}
				alignItems="center"
				borderRadius="md"
			>
				<Box borderRadius="full" overflow="hidden" {...boxSizes[size]}>
					<BlurView intensity={15} tint="dark">
						<Title
							color="white"
							numberOfLines={1}
							ellipsizeMode="tail"
							{...textSizes[size]}
						>
							{title}
						</Title>
					</BlurView>
				</Box>
			</Image>
		</Box>
	);
};

const boxSizes: { [key in PosterSize]: BoxProps } = {
	lg: {
		m: 8,
	},
	md: {
		m: 6,
	},
	sm: {
		m: 4,
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
