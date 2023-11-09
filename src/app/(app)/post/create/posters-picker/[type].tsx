import { useLayoutEffect, useState } from "react";
import {
	FlatList,
	NativeSyntheticEvent,
	Platform,
	TextInputFocusEventData,
	TouchableOpacity,
} from "react-native";
import {
	Stack,
	router,
	useLocalSearchParams,
	useNavigation,
} from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { DiscoverPage, discover } from "@/libs/tmdb/api/discover";
import { SearchPage, search } from "@/libs/tmdb/api/search";
import { usePosters } from "@/providers/posters";
import { ErrorState, EmptyState } from "@/components/commons";
import { Box, Link, Title } from "@/components/ui";
import PosterCard from "@/features/poster-card";
import PosterCardSkeleton from "@/features/poster-card/components/PosterSkeleton";

type Type = "movie" | "tvShow";
type PluralType = "movies" | "tvShows";

const PostersPicker = () => {
	const navigation = useNavigation();
	const { type } = useLocalSearchParams<{ type: Type }>();
	const { colors } = useTheme<Theme>();
	const pluralType: PluralType = `${type}s`;
	const [value, setValue] = useState("");
	const { push } = usePosters();

	const initQuery = useInfiniteQuery<DiscoverPage, Error>({
		queryKey: ["discover", type],
		queryFn: ({ pageParam = 1 }) => discover(type, { page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const query = useInfiniteQuery<SearchPage<PluralType>, Error>({
		queryKey: ["search", type, value],
		queryFn: ({ pageParam = 1 }) =>
			search(pluralType, { query: value, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder:
					type === "movie" ? "Search for movies" : "Search for shows",
				textColor: colors["neutral-12"],
				hintTextColor: colors["neutral-11"],
				headerIconColor: colors["neutral-12"],
				shouldShowHintSearchIcon: false,
				onSearchButtonPress: (
					e: NativeSyntheticEvent<TextInputFocusEventData>
				) => setValue(e.nativeEvent.text.trim()),
				onCancelButtonPress: () => setValue(""),
				hideWhenScrolling: false,
				hideNavigationBar: false,
			},
		});
	}, [navigation]);

	if (initQuery.isError) return <ErrorState retry={initQuery.refetch} />;
	if (query.isError) return <ErrorState retry={query.refetch} />;

	const isLoading = (value && query.isLoading) || initQuery.isLoading;
	const data = value ? query.data : initQuery.data;
	const hasNextPage = value ? query.hasNextPage : initQuery.hasNextPage;
	const fetchNextPage = value ? query.fetchNextPage : initQuery.fetchNextPage;

	return (
		<>
			<Stack.Screen
				options={{
					title: type === "movie" ? "Select Movies" : "Select Shows",
					headerLeft: () =>
						Platform.OS === "ios" ? (
							<Link
								href=".."
								hitSlop={{ top: 6, bottom: 6, left: 12, right: 12 }}
							>
								<Title color="primary-9" fontWeight="normal">
									Cancel
								</Title>
							</Link>
						) : null,
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {
								push();
								router.push("..");
							}}
							hitSlop={{ top: 6, bottom: 6, left: 12, right: 12 }}
						>
							<Title color="primary-9">Done</Title>
						</TouchableOpacity>
					),
				}}
			/>

			{isLoading ? (
				<FlatList
					data={Array.from({ length: 12 })}
					keyExtractor={(_, index) => index.toString()}
					renderItem={() => <PosterCardSkeleton />}
					contentContainerStyle={{ paddingTop: 8 }}
					columnWrapperStyle={{
						justifyContent: "space-between",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
					numColumns={3}
					showsVerticalScrollIndicator={false}
					contentInsetAdjustmentBehavior="automatic"
				/>
			) : (
				<FlatList
					data={data.pages.flatMap((page) => page.results)}
					keyExtractor={(poster) => poster.id}
					renderItem={({ item: poster }) => (
						<PosterCard poster={poster} action="select" />
					)}
					ListEmptyComponent={<EmptyState>No results.</EmptyState>}
					ListFooterComponent={
						<Box pb={64}>
							{hasNextPage && (
								<FlatList
									data={Array.from({ length: 3 })}
									keyExtractor={(_, index) => index.toString()}
									renderItem={() => <PosterCardSkeleton />}
									columnWrapperStyle={{
										justifyContent: "space-between",
										paddingHorizontal: 16,
										paddingVertical: 8,
									}}
									showsVerticalScrollIndicator={false}
									numColumns={3}
								/>
							)}
						</Box>
					}
					contentContainerStyle={{ paddingTop: 8 }}
					columnWrapperStyle={{
						justifyContent: "space-between",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
					showsVerticalScrollIndicator={false}
					contentInsetAdjustmentBehavior="automatic"
					numColumns={3}
					onEndReached={() => fetchNextPage()}
				/>
			)}
		</>
	);
};

export default PostersPicker;
