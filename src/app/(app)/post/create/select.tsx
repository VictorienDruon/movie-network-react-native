import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, TextInput } from "react-native";
import debounce from "lodash.debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "@/libs/axios/api/search";
import { Media } from "@/libs/axios/types";
import {
	Body,
	Box,
	Button,
	EmptyState,
	ErrorState,
	HStack,
	Input,
} from "@/components/ui";

interface Page {
	results: Media[];
	nextCursor: number;
}

const SelectScreen = () => {
	const [value, setValue] = useState("");
	const inputRef = useRef<TextInput>(null);

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["select", value],
		queryFn: ({ pageParam = 1 }) => getAll(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const handleTextChange = debounce((queryValue: string) => {
		setValue(queryValue.trim());
	}, 300);

	const handleClearPress = () => {
		inputRef.current.clear();
		setValue("");
	};

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1}>
			<Box justifyContent="center" height={56} px={28} borderColor="neutral-6">
				<HStack
					flex={1}
					alignItems="center"
					maxHeight={40}
					pl={12}
					pr={8}
					space={8}
					bg="neutral-3"
					borderRadius="lg"
				>
					<Input
						ref={inputRef}
						flex={1}
						placeholder="Search for a movie or a TV"
						color="neutral-12"
						placeholderTextColor="neutral-9"
						onChangeText={handleTextChange}
					/>

					{value && (
						<Button
							rightIcon="X"
							variant="secondary"
							onPress={handleClearPress}
						/>
					)}
				</HStack>
			</Box>

			{value ? (
				query.isLoading ? (
					<ActivityIndicator size="large" />
				) : (
					<FlatList
						data={query.data.pages.flatMap((page) => page.results)}
						keyExtractor={(media) => media.id.toString()}
						renderItem={({ item: media }) => (
							<Body>{media.title ?? media.name}</Body>
						)}
						ListEmptyComponent={<EmptyState>No results</EmptyState>}
						ListFooterComponent={
							<Box pb={64}>
								{query.hasNextPage && <ActivityIndicator size="small" />}
							</Box>
						}
						onEndReached={() => query.fetchNextPage()}
						showsVerticalScrollIndicator={false}
					/>
				)
			) : (
				<EmptyState>Try searching something</EmptyState>
			)}
		</Box>
	);
};

export default SelectScreen;
