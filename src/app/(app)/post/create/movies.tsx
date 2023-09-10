import { useRef, useState } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { usePosters } from "@/providers/posters";
import { discoverMovies } from "@/libs/axios/api/discover";
import { searchMovies } from "@/libs/axios/api/search";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Button, HStack, Input, Title } from "@/components/ui";
import { Poster } from "@/features/poster";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";

const ShowsModal = () => {
	const { push } = usePosters();
	const [value, setValue] = useState<string>("");
	const inputRef = useRef<TextInput>(null);

	const initQuery = useQuery<Poster[], Error>({
		queryKey: ["discoverMovies"],
		queryFn: discoverMovies,
	});

	const query = useQuery<Poster[], Error>({
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
	const posters = value ? query.data : initQuery.data;

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

				<Box>
					{isLoading ? (
						<FlatList
							data={Array.from({ length: 12 })}
							keyExtractor={(_, index) => index.toString()}
							renderItem={() => <PosterSkeleton m={8} />}
							contentContainerStyle={{ paddingBottom: 128 }}
							ListEmptyComponent={<EmptyState>No results.</EmptyState>}
							numColumns={3}
							showsVerticalScrollIndicator={false}
						/>
					) : (
						<FlatList
							data={posters}
							keyExtractor={(poster) => poster.id.toString()}
							renderItem={({ item: poster }) => (
								<Poster poster={poster} m={8} />
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
			</Box>
		</>
	);
};

export default ShowsModal;
