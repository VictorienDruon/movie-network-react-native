import { useRef, useState } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { usePosters } from "@/providers/posters";
import { discoverMovies } from "@/libs/axios/api/discover";
import { searchMovies } from "@/libs/axios/api/search";
import { Movie } from "@/libs/axios/types/Movie";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Button, HStack, Input, Title } from "@/components/ui";
import Card from "@/features/card";
import CardSkeleton from "@/features/card/components/CardSkeleton";

const MoviesModal = () => {
	const { isSelected, toggle, push } = usePosters();
	const [value, setValue] = useState<string>("");
	const inputRef = useRef<TextInput>(null);

	const initQuery = useQuery<Movie[], Error>({
		queryKey: ["discoverMovies"],
		queryFn: discoverMovies,
	});

	const query = useQuery<Movie[], Error>({
		queryKey: ["searchMovies", value],
		queryFn: () => searchMovies(value),
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
	const movies = value ? query.data : initQuery.data;

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

			<Box alignItems="center">
				<HStack
					alignItems="center"
					height={40}
					m={8}
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
						data={Array.from({ length: 9 })}
						keyExtractor={(_, index) => index.toString()}
						renderItem={() => <CardSkeleton m={8} />}
						contentContainerStyle={{ paddingBottom: 128 }}
						ListEmptyComponent={<EmptyState>No results.</EmptyState>}
						numColumns={3}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<FlatList
						data={movies}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Card
								{...item}
								m={8}
								isSelected={isSelected(item.id)}
								onPress={() =>
									toggle({
										type: "movie",
										id: item.id,
										title: item.title,
										poster_path: item.poster_path,
									})
								}
							/>
						)}
						contentContainerStyle={{
							paddingBottom: 128,
						}}
						ListEmptyComponent={<EmptyState>No results.</EmptyState>}
						numColumns={3}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</Box>
		</>
	);
};

export default MoviesModal;
