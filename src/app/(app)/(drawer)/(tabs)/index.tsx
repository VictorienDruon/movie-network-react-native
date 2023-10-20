import { useRef } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { getWatchlist } from "@/libs/supabase/api/watchlist";
import { ErrorState } from "@/components/commons";
import { WatchlistSkeleton } from "@/components/skeletons";
import { Box, Heading, Subtitle, Title, VStack } from "@/components/ui";
import Backdrop from "@/features/watchlist/Backdrop";
import WatchlistItemCard from "@/features/watchlist/Item";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = Math.round(width * 0.72);
const BACKDROP_HEIGHT = Math.round(height * 0.4);
const DUMMY_WIDTH = Math.round((width - ITEM_SIZE) / 2);

const WatchlistScreen = () => {
	const { colors } = useTheme<Theme>();
	const scrollX = useRef(new Animated.Value(0)).current;

	const query = useInfiniteQuery({
		queryKey: ["watchlist"],
		queryFn: ({ pageParam = 0 }) => getWatchlist(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <WatchlistSkeleton />;
	if (query.isError) return <ErrorState retry={query.refetch} />;

	if (query.data.pages[0].results.length === 0) {
		return (
			<VStack
				flex={1}
				justifyContent="center"
				alignItems="center"
				p={32}
				space={16}
			>
				<Heading fontSize={96} lineHeight={108}>
					🍿
				</Heading>
				<Title textAlign="center">Your watchlist is empty!</Title>
				<Subtitle textAlign="center">
					Add movies and TV shows to your watchlist to see them here.
				</Subtitle>
			</VStack>
		);
	}

	return (
		<Box flex={1}>
			<Box position="absolute" width={width} height={BACKDROP_HEIGHT}>
				<FlatList
					data={query.data.pages.flatMap((page) => page.results)}
					keyExtractor={(item) => item.id + item.type}
					renderItem={({ item, index }) => (
						<Backdrop
							item={item}
							index={index}
							scrollX={scrollX}
							itemSize={ITEM_SIZE}
							backdropHeight={BACKDROP_HEIGHT}
						/>
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
				renderItem={({ item, index }) =>
					"title" in item ? (
						<WatchlistItemCard
							item={item}
							index={index}
							scrollX={scrollX}
							itemSize={ITEM_SIZE}
						/>
					) : (
						<Box width={DUMMY_WIDTH} />
					)
				}
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
				onEndReachedThreshold={0.1}
				onEndReached={() => query.fetchNextPage()}
			/>
		</Box>
	);
};

export default WatchlistScreen;
