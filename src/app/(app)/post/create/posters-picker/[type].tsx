import { useLayoutEffect, useState } from "react";
import {
	FlatList,
	NativeSyntheticEvent,
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
import { discoverMovies, discoverTv } from "@/libs/axios/api/discover";
import { searchMovies, searchTv } from "@/libs/axios/api/search";
import { usePosters } from "@/providers/posters";
import { ErrorState, EmptyState } from "@/components/commons";
import { Box, Link, Title } from "@/components/ui";
import { Poster } from "@/features/poster";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";

interface PostersPage {
	posters: Poster[];
	nextCursor: number;
}

const PostersPicker = () => {
	const navigation = useNavigation();
	const { type } = useLocalSearchParams<{
		type: "movie" | "tv";
	}>();
	const [value, setValue] = useState("");
	const { push } = usePosters();

	const discoverFn = type === "movie" ? discoverMovies : discoverTv;
	const searchFn = type === "movie" ? searchMovies : searchTv;

	const initQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["discover", type],
		queryFn: ({ pageParam = 1 }) => discoverFn(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const query = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["search", type, value],
		queryFn: ({ pageParam = 1 }) => searchFn(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: type === "movie" ? "Search movies" : "Search Shows",
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
					headerLeft: () => (
						<Link href="..">
							<Title color="primary-9" fontWeight="normal">
								Cancel
							</Title>
						</Link>
					),
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {
								push();
								router.push("..");
							}}
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
					renderItem={() => <PosterSkeleton />}
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
					data={data.pages.flatMap((page) => page.posters)}
					keyExtractor={(poster) => poster.id.toString()}
					renderItem={({ item: poster }) => (
						<Poster poster={poster} action="select" />
					)}
					ListEmptyComponent={<EmptyState>No results.</EmptyState>}
					ListFooterComponent={
						<Box pb={64}>
							{hasNextPage && (
								<FlatList
									data={Array.from({ length: 3 })}
									keyExtractor={(_, index) => index.toString()}
									renderItem={() => <PosterSkeleton />}
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
