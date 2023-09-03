import { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Link, Stack } from "expo-router";
import debounce from "lodash.debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverShows } from "@/libs/axios/api/discover";
import { searchShows } from "@/libs/axios/api/search";
import { Show } from "@/libs/axios/types/Show";
import { usePosters } from "@/providers/posters";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Button, HStack, Input, Title } from "@/components/ui";
import Card from "@/features/card";
import CardSkeletons from "@/features/card/components/CardSkeleton";

interface ShowsPage {
	shows: Show[];
	nextCursor: number;
}

const ShowsModal = () => {
	const { isSelected, toggle, push } = usePosters();
	const [value, setValue] = useState<string>("");
	const inputRef = useRef<TextInput>(null);
	const { width } = Dimensions.get("screen");
	const margin = (width - 332) / 6;

	const initQuery = useInfiniteQuery<ShowsPage, Error>({
		queryKey: ["discoverShows"],
		queryFn: ({ pageParam = 1 }) => discoverShows(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const query = useInfiniteQuery<ShowsPage, Error>({
		queryKey: ["searchShows", value],
		queryFn: ({ pageParam = 1 }) => searchShows(value, pageParam),
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

			<Box flex={1} px={16}>
				<Box justifyContent="center" height={56} borderColor="neutral-6">
					<HStack
						flex={1}
						alignItems="center"
						maxHeight={40}
						p={8}
						pl={16}
						space={8}
						bg="neutral-3"
						borderRadius="xl"
					>
						<Input
							ref={inputRef}
							flex={1}
							placeholder={`Search for a TV show`}
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
				</Box>

				{isLoading ? (
					<CardSkeletons count={9} margin={margin} />
				) : (
					<FlatList
						data={data.pages.flatMap((page) => page.shows)}
						numColumns={3}
						keyExtractor={(show) => show.id.toString()}
						renderItem={({ item: show }) => (
							<Card
								title={show.name}
								posterPath={show.poster_path}
								isSelected={isSelected(show.id)}
								margin={margin}
								onPress={() =>
									toggle({
										type: "show",
										id: show.id,
										title: show.name,
										poster_path: show.poster_path,
									})
								}
							/>
						)}
						ListEmptyComponent={<EmptyState>No results</EmptyState>}
						ListFooterComponent={
							<Box pb={64}>
								{hasNextPage && <CardSkeletons count={3} margin={margin} />}
							</Box>
						}
						onEndReached={() => fetchNextPage()}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</Box>
		</>
	);
};

export default ShowsModal;
