import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { getLocales } from "expo-localization";
import { useInfiniteQuery } from "@tanstack/react-query";
import { providersList } from "@/utils/providersList";
import { DiscoverPage, discover } from "@/libs/tmdb/api/discover";
import { ErrorState } from "@/components/commons";
import { Section } from "@/components/layouts";
import { Heading, VStack } from "@/components/ui";
import PosterCard from "@/features/poster-card";
import PosterCardSkeleton from "@/features/poster-card/components/PosterSkeleton";

const ProviderScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { regionCode } = getLocales()[0];
	const { name } = providersList.find((provider) => provider.id === id);

	const moviesQuery = useInfiniteQuery<DiscoverPage, Error>({
		queryKey: ["genre", "movies", id],
		queryFn: ({ pageParam = 1 }) =>
			discover("movie", {
				page: pageParam,
				watch_region: regionCode,
				with_watch_providers: id,
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const showsQuery = useInfiniteQuery<DiscoverPage, Error>({
		queryKey: ["genre", "shows", id],
		queryFn: ({ pageParam = 1 }) =>
			discover("tvShow", {
				page: pageParam,
				watch_region: regionCode,
				with_watch_providers: id,
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (moviesQuery.isError) return <ErrorState retry={moviesQuery.refetch} />;
	if (showsQuery.isError) return <ErrorState retry={showsQuery.refetch} />;

	return (
		<>
			<Stack.Screen options={{ title: name }} />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 24,
					paddingBottom: 64,
				}}
			>
				<VStack space={24}>
					<Heading px={16} fontSize={24} lineHeight={28}>
						{name}
					</Heading>

					{moviesQuery.isLoading ? (
						<Section title="Movies" size="lg" flatlist>
							<FlatList
								data={[...Array(3).keys()]}
								keyExtractor={(i) => "movie" + i.toString()}
								renderItem={() => <PosterCardSkeleton size="md" mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					) : (
						moviesQuery.data.pages[0].results.length > 0 && (
							<Section title="Movies" size="lg" flatlist>
								<FlatList
									data={moviesQuery.data.pages.flatMap((page) => page.results)}
									keyExtractor={(m) => "movie" + m.id}
									renderItem={({ item }) => (
										<PosterCard poster={item} size="md" mx={8} />
									)}
									ListFooterComponent={() =>
										moviesQuery.hasNextPage && (
											<PosterCardSkeleton size="md" mx={8} />
										)
									}
									contentContainerStyle={{ paddingHorizontal: 8 }}
									showsHorizontalScrollIndicator={false}
									onEndReached={() => moviesQuery.fetchNextPage()}
									horizontal
								/>
							</Section>
						)
					)}

					{showsQuery.isLoading ? (
						<Section title="Shows" size="lg" flatlist>
							<FlatList
								data={[...Array(3).keys()]}
								keyExtractor={(i) => "movie" + i.toString()}
								renderItem={() => <PosterCardSkeleton size="md" mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					) : (
						showsQuery.data.pages[0].results.length > 0 && (
							<Section title="Shows" size="lg" flatlist>
								<FlatList
									data={showsQuery.data.pages.flatMap((page) => page.results)}
									keyExtractor={(s) => "show" + s.id}
									renderItem={({ item }) => (
										<PosterCard poster={item} size="md" mx={8} />
									)}
									ListFooterComponent={() =>
										showsQuery.hasNextPage && (
											<PosterCardSkeleton size="md" mx={8} />
										)
									}
									contentContainerStyle={{ paddingHorizontal: 8 }}
									showsHorizontalScrollIndicator={false}
									onEndReached={() => showsQuery.fetchNextPage()}
									horizontal
								/>
							</Section>
						)
					)}
				</VStack>
			</ScrollView>
		</>
	);
};

export default ProviderScreen;
