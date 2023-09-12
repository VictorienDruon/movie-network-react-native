import { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import debounce from "lodash.debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePosters } from "@/providers/posters";
import { discoverMovies, discoverShows } from "@/libs/axios/api/discover";
import { searchMovies, searchShows } from "@/libs/axios/api/search";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Button, HStack, Input, Title } from "@/components/ui";
import { Poster } from "@/features/poster";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";

interface PostersPage {
	posters: Poster[];
	nextCursor: number;
}

const AttachmentsModal = () => {
	const { attachments } = useLocalSearchParams<{ attachments: string }>();
	const { push } = usePosters();
	const [value, setValue] = useState<string>("");
	const inputRef = useRef<TextInput>(null);
	const { width } = Dimensions.get("screen");
	const gridSpacing = (width - 332) / 6;

	const discoverFn = attachments === "movies" ? discoverMovies : discoverShows;
	const searchFn = attachments === "movies" ? searchMovies : searchShows;

	const initQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["discover", attachments],
		queryFn: ({ pageParam = 1 }) => discoverFn(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const query = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["search", attachments, value],
		queryFn: ({ pageParam = 1 }) => searchFn(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const handleValueChange = debounce((newValue: string) => {
		setValue(newValue.trim());
	}, 500);

	const handleClearPress = () => {
		inputRef.current.clear();
		setValue("");
	};

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
					title: attachments === "movies" ? "Select Movies" : "Select TV Shows",
					headerLeft: () => (
						<Link href=".." asChild>
							<TouchableOpacity>
								<Title color="primary-9" fontWeight="normal">
									Cancel
								</Title>
							</TouchableOpacity>
						</Link>
					),
					headerRight: () => (
						<Link href=".." asChild>
							<TouchableOpacity onPress={push}>
								<Title color="primary-9">Done</Title>
							</TouchableOpacity>
						</Link>
					),
				}}
			/>

			<Box px={16}>
				<HStack
					alignItems="center"
					height={40}
					my={8}
					p={8}
					pl={16}
					space={8}
					bg="neutral-3"
					borderRadius="xl"
				>
					<Input
						ref={inputRef}
						flex={1}
						placeholder={`Search for a Movie`}
						color="neutral-12"
						placeholderTextColor="neutral-9"
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={handleValueChange}
					/>

					<Button
						rightIcon="X"
						variant="secondary"
						onPress={handleClearPress}
					/>
				</HStack>

				{isLoading ? (
					<FlatList
						data={Array.from({ length: 12 })}
						keyExtractor={(_, index) => index.toString()}
						renderItem={() => <PosterSkeleton gridSpacing={gridSpacing} />}
						numColumns={3}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<FlatList
						data={data.pages.flatMap((page) => page.posters)}
						keyExtractor={(poster) => poster.tmdb_id.toString()}
						renderItem={({ item: poster }) => (
							<Poster
								poster={poster}
								action="select"
								gridSpacing={gridSpacing}
							/>
						)}
						ListEmptyComponent={<EmptyState>No results.</EmptyState>}
						ListFooterComponent={
							<Box pb={128}>
								{hasNextPage && (
									<FlatList
										data={Array.from({ length: 3 })}
										keyExtractor={(_, index) => index.toString()}
										renderItem={() => (
											<PosterSkeleton gridSpacing={gridSpacing} />
										)}
										numColumns={3}
										showsVerticalScrollIndicator={false}
									/>
								)}
							</Box>
						}
						onEndReached={() => fetchNextPage()}
						numColumns={3}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</Box>
		</>
	);
};

export default AttachmentsModal;
