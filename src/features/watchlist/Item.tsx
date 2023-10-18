import { Animated, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { tmdbConfig } from "@/libs/tmdb";
import { Box, Heading, Image, Title } from "@/components/ui";
import { WatchlistItem } from "./types/WatchlistItem";

const { width } = Dimensions.get("screen");
const ITEM_SIZE = width * 0.65;
const DUMMY_WIDTH = (width - ITEM_SIZE) / 2;

interface WatchlistItemCardProps {
	item: WatchlistItem;
	index: number;
	scrollX: Animated.Value;
}

const WatchlistItemCard = ({
	item,
	index,
	scrollX,
}: WatchlistItemCardProps) => {
	const { title, posterPath } = item;
	const theme = useTheme<Theme>();

	if (!("title" in item)) return <Box width={DUMMY_WIDTH} />;

	const inputRange = [
		(index - 2) * ITEM_SIZE,
		(index - 1) * ITEM_SIZE,
		index * ITEM_SIZE,
	];
	const translateY = scrollX.interpolate({
		inputRange,
		outputRange: [25, -25, 25],
	});

	return (
		<Box alignItems="center" width={ITEM_SIZE}>
			<Animated.View
				style={{
					flexDirection: "column",
					alignItems: "center",
					maxWidth: 224,
					padding: 12,
					gap: 8,
					borderRadius: theme.borderRadii.xl,
					backgroundColor: theme.colors["neutral-1"],
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

				<Title textAlign="center" numberOfLines={2} ellipsizeMode="tail">
					{title}
				</Title>
			</Animated.View>
		</Box>
	);
};

export default WatchlistItemCard;
