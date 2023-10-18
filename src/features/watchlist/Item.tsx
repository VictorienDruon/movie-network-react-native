import { Animated } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { tmdbConfig } from "@/libs/tmdb";
import { getYear } from "@/utils/dates";
import { formatDuration } from "@/utils/time";
import {
	Body,
	Box,
	HStack,
	Icon,
	Image,
	Link,
	Subtitle,
	Title,
	VStack,
} from "@/components/ui";
import { WatchlistItem } from "./types/WatchlistItem";

interface WatchlistItemCardProps {
	item: WatchlistItem;
	index: number;
	scrollX: Animated.Value;
	itemSize: number;
}

const WatchlistItemCard = ({
	item,
	index,
	scrollX,
	itemSize,
}: WatchlistItemCardProps) => {
	const {
		id,
		type,
		title,
		posterPath,
		date,
		runtime,
		seasonNumber,
		rating,
		overview,
	} = item;
	const theme = useTheme<Theme>();

	const inputRange = [
		(index - 2) * itemSize,
		(index - 1) * itemSize,
		index * itemSize,
	];
	const translateY = scrollX.interpolate({
		inputRange,
		outputRange: [75, 25, 75],
	});

	return (
		<Box alignItems="center" width={itemSize}>
			<Animated.View
				style={{
					flexDirection: "column",
					alignItems: "center",
					marginHorizontal: 12,
					padding: 12,
					gap: 16,
					borderRadius: theme.borderRadii.xl,
					backgroundColor: theme.colors["neutral-1"],
					transform: [{ translateY }],
				}}
			>
				<Link
					href={{
						pathname: "/media/[type]/[id]",
						params: { type, id },
					}}
				>
					<Box
						bg="neutral-3"
						borderRadius="sm"
						shadowColor="black"
						shadowOffset={{ width: 0, height: 10 }}
						shadowOpacity={0.15}
						shadowRadius={15}
						elevation={5}
					>
						<Image
							src={`${tmdbConfig.links.image}/w780${posterPath}`}
							alt={title}
							width={itemSize - 48}
							aspectRatio={5 / 7}
							borderRadius="lg"
						/>
					</Box>
				</Link>

				<VStack alignItems="center" space={2}>
					<Title textAlign="center" numberOfLines={2} ellipsizeMode="tail">
						{title}
					</Title>

					<HStack space={4}>
						{date?.length > 0 && <Subtitle>{getYear(new Date(date))}</Subtitle>}
						{date?.length > 0 && (runtime > 0 || seasonNumber > 0) && (
							<Subtitle>•</Subtitle>
						)}
						{type === "movie"
							? runtime > 0 && <Subtitle>{formatDuration(runtime)}</Subtitle>
							: seasonNumber > 0 && (
									<Subtitle>{`${seasonNumber} seasons`}</Subtitle>
							  )}
						{(date?.length > 0 || runtime > 0 || seasonNumber > 0) &&
							rating > 0 && <Subtitle>•</Subtitle>}
						{rating > 0 && (
							<HStack justifyContent="center" alignItems="center" space={4}>
								<Subtitle>{rating.toFixed(1)}</Subtitle>
								<Icon name="Star" size={12} fill />
							</HStack>
						)}
					</HStack>
				</VStack>

				{overview?.length > 0 && (
					<Body numberOfLines={3} ellipsizeMode="tail">
						{overview}
					</Body>
				)}
			</Animated.View>
		</Box>
	);
};

export default WatchlistItemCard;
