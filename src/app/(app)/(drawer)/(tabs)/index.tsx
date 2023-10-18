import { useRef } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { color, useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { getWatchlist } from "@/libs/supabase/api/watchlist";
import { ErrorState } from "@/components/commons";
import { Box } from "@/components/ui";
import Backdrop from "@/features/watchlist/Backdrop";
import WatchlistItemCard from "@/features/watchlist/Item";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("screen");
const ITEM_SIZE = width * 0.65;
const BACKDROP_HEIGHT = (width * 9) / 16;

const WatchlistScreen = () => {
	const { colors } = useTheme<Theme>();
	const scrollX = useRef(new Animated.Value(0)).current;

	const query = useInfiniteQuery({
		queryKey: ["watchlist"],
		queryFn: ({ pageParam = 0 }) => getWatchlist(pageParam),
	});

	if (query.isLoading) return null;
	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1}>
			<Box position="absolute" width={width} height={BACKDROP_HEIGHT}>
				<FlatList
					data={query.data.pages.flatMap((page) => page.results)}
					keyExtractor={(item) => item.id + item.type}
					renderItem={({ item, index }) => (
						<Backdrop item={item} index={index} scrollX={scrollX} />
					)}
				/>

				<LinearGradient
					colors={["transparent", colors["neutral-1"]]}
					style={{
						position: "absolute",
						bottom: 0,
						width,
						height: BACKDROP_HEIGHT,
					}}
				/>
			</Box>

			<Animated.FlatList
				data={[
					{ id: "left", type: "dummy" },
					...query.data.pages.flatMap((page) => page.results),
					{ id: "right", type: "dummy" },
				]}
				keyExtractor={(item) => item.id + item.type}
				renderItem={({ item, index }) => (
					<WatchlistItemCard item={item} index={index} scrollX={scrollX} />
				)}
				contentContainerStyle={{
					alignItems: "center",
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				bounces={false}
				snapToInterval={ITEM_SIZE}
				decelerationRate={0}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
			/>
		</Box>
	);
};

export default WatchlistScreen;
