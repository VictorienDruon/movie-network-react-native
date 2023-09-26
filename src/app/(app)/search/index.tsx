import { useLayoutEffect, useState } from "react";
import {
	FlatList,
	NativeSyntheticEvent,
	ScrollView,
	TextInputFocusEventData,
} from "react-native";
import { useNavigation } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies, searchPeople, searchTv } from "@/libs/axios/api/search";
import { searchProfiles } from "@/libs/supabase/api/profiles";
import { ErrorState } from "@/components/commons";
import { Section } from "@/components/layouts";
import { Avatar, Body, Link, VStack } from "@/components/ui";
import { Poster } from "@/features/poster";
import { Person } from "@/features/person";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";
import PersonSkeleton from "@/features/person/components/PersonSkeleton";

const SearchScreen = () => {
	const navigation = useNavigation();
	const [value, setValue] = useState("");

	interface PostersPage {
		posters: Poster[];
		nextCursor: number;
	}

	interface PeoplePage {
		people: Person[];
		nextCursor: number;
	}

	const moviesQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["search", "movies", value],
		queryFn: ({ pageParam = 1 }) => searchMovies(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const tvQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["search", "tv", value],
		queryFn: ({ pageParam = 1 }) => searchTv(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const peopleQuery = useInfiniteQuery<PeoplePage, Error>({
		queryKey: ["search", "people", value],
		queryFn: ({ pageParam = 1 }) => searchPeople(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	const profilesQuery = useInfiniteQuery<any, Error>({
		queryKey: ["search", "users", value],
		queryFn: ({ pageParam = 1 }) => searchProfiles(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: "Movies, shows, people and more",
				onSearchButtonPress: (
					e: NativeSyntheticEvent<TextInputFocusEventData>
				) => setValue(e.nativeEvent.text.trim()),
				onCancelButtonPress: () => setValue(""),
				hideWhenScrolling: false,
				hideNavigationBar: false,
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
					moviesQuery.data.pages[0].posters.length > 0) && (
					<Section title="Movies" size="lg" flatlist>
						{moviesQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PosterSkeleton mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={moviesQuery.data.pages.flatMap((page) => page.posters)}
								keyExtractor={(p) => p.tmdb_id.toString()}
								renderItem={({ item: poster }) => (
									<Poster
										poster={poster}
										size="sm"
										style={{ marginHorizontal: 8 }}
									/>
								)}
								ListFooterComponent={() =>
									moviesQuery.hasNextPage && <PosterSkeleton mx={8} />
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => moviesQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>
				)}

				{(tvQuery.isLoading || tvQuery.data.pages[0].posters.length > 0) && (
					<Section title="Shows" size="lg" flatlist>
						{tvQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PosterSkeleton mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={tvQuery.data.pages.flatMap((page) => page.posters)}
								keyExtractor={(p) => p.tmdb_id.toString()}
								renderItem={({ item: poster }) => (
									<Poster
										poster={poster}
										size="sm"
										style={{ marginHorizontal: 8 }}
									/>
								)}
								ListFooterComponent={() =>
									tvQuery.hasNextPage && <PosterSkeleton mx={8} />
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
					peopleQuery.data.pages[0].people.length > 0) && (
					<Section title="People" size="lg" flatlist>
						{peopleQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PersonSkeleton withRole={false} mx={4} />}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={peopleQuery.data.pages.flatMap((page) => page.people)}
								keyExtractor={(p) => p.id.toString()}
								renderItem={({ item: person }) => (
									<Person person={person} mx={8} />
								)}
								ListFooterComponent={() =>
									peopleQuery.hasNextPage && (
										<PersonSkeleton withRole={false} mx={8} />
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
					profilesQuery.data.pages[0].profiles.length > 0) && (
					<Section title="Users" size="lg" flatlist>
						{profilesQuery.isLoading ? (
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PersonSkeleton withRole={false} mx={4} />}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								horizontal={true}
							/>
						) : (
							<FlatList
								data={profilesQuery.data.pages.flatMap((page) => page.profiles)}
								keyExtractor={(p) => p.id.toString()}
								renderItem={({ item: profile }) => (
									<VStack alignItems="center" width={96} mx={8} space={0}>
										<Link
											href={{
												pathname: "/profile/[id]",
												params: { id: profile.id },
											}}
										>
											<Avatar
												src={profile.avatar_url}
												size={80}
												alt={`${profile.name} avatar`}
											/>
										</Link>

										<Body
											textAlign="center"
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											{profile.name}
										</Body>
									</VStack>
								)}
								ListFooterComponent={() =>
									profilesQuery.hasNextPage && (
										<PersonSkeleton withRole={false} mx={8} />
									)
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => profilesQuery.fetchNextPage()}
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
