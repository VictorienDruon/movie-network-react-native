import { useLayoutEffect, useState } from "react";
import {
	FlatList,
	NativeSyntheticEvent,
	ScrollView,
	TextInputFocusEventData,
} from "react-native";
import { useNavigation } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchPage, search as searchTmdb } from "@/libs/tmdb/api/search";
import { searchProfiles } from "@/libs/supabase/api/profiles";
import { ErrorState } from "@/components/commons";
import { Section } from "@/components/layouts";
import { VStack } from "@/components/ui";
import PosterCard from "@/features/poster-card";
import PersonCard from "@/features/person-card";
import PosterCardSkeleton from "@/features/poster-card/components/PosterSkeleton";
import PersonCardSkeleton from "@/features/person-card/components/PersonCardSkeleton";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";

const SearchScreen = () => {
	const navigation = useNavigation();
	const { colors } = useTheme<Theme>();
	const [value, setValue] = useState("");

	const moviesQuery = useInfiniteQuery<SearchPage<"movies">, Error>({
		queryKey: ["search", "movies", value],
		queryFn: ({ pageParam = 1 }) =>
			searchTmdb("movies", { query: value, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const tvQuery = useInfiniteQuery<SearchPage<"tvShows">, Error>({
		queryKey: ["search", "tv", value],
		queryFn: ({ pageParam = 1 }) =>
			searchTmdb("tvShows", { query: value, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const peopleQuery = useInfiniteQuery<SearchPage<"people">, Error>({
		queryKey: ["search", "people", value],
		queryFn: ({ pageParam = 1 }) =>
			searchTmdb("people", { query: value, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const profilesQuery = useInfiniteQuery({
		queryKey: ["search", "users", value],
		queryFn: ({ pageParam = 1 }) => searchProfiles(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: "Movies, shows, people, users...",
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
				autoFocus: true,
			},
		});
	}, [navigation]);

	if (moviesQuery.isError) return <ErrorState retry={moviesQuery.refetch} />;
	if (tvQuery.isError) return <ErrorState retry={tvQuery.refetch} />;
	if (peopleQuery.isError) return <ErrorState retry={peopleQuery.refetch} />;
	if (profilesQuery.isError)
		return <ErrorState retry={profilesQuery.refetch} />;

	if (value.length === 0) return null;

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{
				paddingTop: 24,
				paddingBottom: 64,
			}}
		>
			<VStack space={24}>
				{(moviesQuery.isLoading ||
					moviesQuery.data.pages[0].results.length > 0) && (
					<Section title="Movies" size="lg" flatlist>
						{moviesQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PosterCardSkeleton mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={moviesQuery.data.pages.flatMap((page) => page.results)}
								keyExtractor={(p) => p.id}
								renderItem={({ item: poster }) => (
									<PosterCard
										poster={poster}
										size="sm"
										style={{ marginHorizontal: 8 }}
									/>
								)}
								ListFooterComponent={() =>
									moviesQuery.hasNextPage && <PosterCardSkeleton mx={8} />
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => moviesQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>
				)}

				{(tvQuery.isLoading || tvQuery.data.pages[0].results.length > 0) && (
					<Section title="Shows" size="lg" flatlist>
						{tvQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PosterCardSkeleton mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={tvQuery.data.pages.flatMap((page) => page.results)}
								keyExtractor={(p) => p.id}
								renderItem={({ item: poster }) => (
									<PosterCard
										poster={poster}
										size="sm"
										style={{ marginHorizontal: 8 }}
									/>
								)}
								ListFooterComponent={() =>
									tvQuery.hasNextPage && <PosterCardSkeleton mx={8} />
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => tvQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>
				)}

				{(peopleQuery.isLoading ||
					peopleQuery.data.pages[0].results.length > 0) && (
					<Section title="People" size="lg" flatlist>
						{peopleQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => (
									<PersonCardSkeleton withRole={false} mx={4} />
								)}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={peopleQuery.data.pages.flatMap((page) => page.results)}
								keyExtractor={(p) => p.id}
								renderItem={({ item: person }) => (
									<PersonCard person={person} mx={8} />
								)}
								ListFooterComponent={() =>
									peopleQuery.hasNextPage && (
										<PersonCardSkeleton withRole={false} mx={8} />
									)
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => peopleQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>
				)}

				{(profilesQuery.isLoading ||
					profilesQuery.data.pages[0].results.length > 0) && (
					<Section title="Users" size="lg" flatlist>
						{profilesQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => (
									<PersonCardSkeleton withRole={false} mx={4} />
								)}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={profilesQuery.data.pages.flatMap((page) => page.results)}
								keyExtractor={(p) => p.id}
								renderItem={({ item: profile }) => (
									<PersonCard person={profile} mx={8} />
								)}
								ListFooterComponent={() =>
									peopleQuery.hasNextPage && (
										<PersonCardSkeleton withRole={false} mx={8} />
									)
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => peopleQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>
				)}
			</VStack>
		</ScrollView>
	);
};

export default SearchScreen;
