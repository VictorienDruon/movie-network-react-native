import { Animated, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { tmdbConfig } from "@/libs/tmdb";
import { Box, Image, Title } from "@/components/ui";
import { WatchlistItem } from "./types/WatchlistItem";

interface WatchlistItemCardProps {
	item: WatchlistItem;
	translateY: Animated.AnimatedInterpolation<string | number>;
}

const WatchlistItemCard = ({ item, translateY }: WatchlistItemCardProps) => {
	const { title, posterPath } = item;
	const { width } = Dimensions.get("screen");
	const itemSize = width * 0.72;
	const dummyWidth = (width - itemSize) / 2;
	const theme = useTheme<Theme>();

	if (!("title" in item)) return <Box width={dummyWidth} />;

	return (
		<Box width={itemSize}>
			<Animated.View
				style={{
					flexDirection: "column",
					alignItems: "center",
					marginHorizontal: 12,
					padding: 24,
					gap: 16,
					borderRadius: theme.borderRadii.lg,
					backgroundColor: theme.colors["primary-1"],
					transform: [{ translateY }],
				}}
			>
				<Image
					src={`${tmdbConfig.links.image}/w780${posterPath}`}
					alt={title}
					width={200}
					aspectRatio={2 / 3}
					borderRadius="md"
				/>

				<Title textAlign="center">{title}</Title>
			</Animated.View>
		</Box>
	);
};

export default WatchlistItemCard;
