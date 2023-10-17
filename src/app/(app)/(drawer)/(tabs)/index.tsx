import { useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getWatchlist } from "@/libs/supabase/api/watchlist";
import { ErrorState } from "@/components/commons";
import WatchlistItemCard from "@/features/watchlist/Item";
import { Box } from "@/components/ui";
import Backdrop from "@/features/watchlist/Backdrop";

const WatchlistScreen = () => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const { width } = Dimensions.get("screen");
	const itemSize = width * 0.72;

	const query = useInfiniteQuery({
		queryKey: ["watchlist"],
		queryFn: ({ pageParam = 0 }) => getWatchlist(pageParam),
	});

	if (query.isLoading) return null;
	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1}>
			<Backdrop
				watchlist={query.data.pages.flatMap((page) => page.results)}
				scrollX={scrollX}
			/>

			<Animated.FlatList
				data={[
					{ id: "leftDummyItem" },
					...query.data.pages.flatMap((page) => page.results),
					{ id: "rightDummyItem" },
				]}
				keyExtractor={(item) => item.id + item.type}
				renderItem={({ item, index }) => {
					const inputRange = [
						(index - 2) * itemSize,
						(index - 1) * itemSize,
						index * itemSize,
					];
					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
					});

					return <WatchlistItemCard item={item} translateY={translateY} />;
				}}
				contentContainerStyle={{
					alignItems: "center",
				}}
				showsHorizontalScrollIndicator={false}
				bounces={false}
				horizontal
				snapToInterval={itemSize}
				decelerationRate={0}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={16}
			/>
		</Box>
	);
};

export default WatchlistScreen;
