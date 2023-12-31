import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "@/libs/tmdb/api/person";
import { getDateWithYear } from "@/utils/dates";
import { ErrorState } from "@/components/commons";
import { Information, Section } from "@/components/layouts";
import { PersonSkeleton } from "@/components/skeletons";
import { Body, Heading, VStack } from "@/components/ui";
import PosterCard from "@/features/poster-card";

const PersonScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery({
		queryKey: ["person", id],
		queryFn: () => getPerson(id),
	});

	if (query.isLoading) return <PersonSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const {
		name,
		department,
		birthday,
		deathday,
		placeOfBirth: placeOfBitrh,
		biography,
		movies,
		shows,
		directed,
		written,
		composed,
	} = query.data;

	return (
		<>
			<Stack.Screen options={{ title: name }} />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 24,
					paddingBottom: 128,
				}}
			>
				<VStack space={24}>
					<Heading px={16} fontSize={24} lineHeight={28}>
						{name}
					</Heading>

					{movies.length > 0 && (
						<Section title="Movies" size="lg" flatlist>
							<FlatList
								data={movies}
								keyExtractor={(m) => "movie" + m.id}
								renderItem={({ item }) => <PosterCard poster={item} mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{shows.length > 0 && (
						<Section title="Shows" size="lg" flatlist>
							<FlatList
								data={shows}
								keyExtractor={(s) => "show" + s.id}
								renderItem={({ item }) => <PosterCard poster={item} mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{directed.length > 0 && (
						<Section title="Director" size="lg" flatlist>
							<FlatList
								data={directed}
								keyExtractor={(d) => "directed" + d.id}
								renderItem={({ item }) => <PosterCard poster={item} mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{written.length > 0 && (
						<Section title="Writer" size="lg" flatlist>
							<FlatList
								data={written}
								keyExtractor={(w) => "written" + w.id}
								renderItem={({ item }) => <PosterCard poster={item} mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{composed.length > 0 && (
						<Section title="Music Composer" size="lg" flatlist>
							<FlatList
								data={composed}
								keyExtractor={(c) => "composed" + c.id}
								renderItem={({ item }) => <PosterCard poster={item} mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{biography?.length > 0 && (
						<Section title="Biography" size="lg">
							<Body>{biography}</Body>
						</Section>
					)}

					<Section title="Informations" size="lg">
						{department?.length > 0 && (
							<Information title="Department" content={department} />
						)}

						{placeOfBitrh?.length > 0 && (
							<Information title="Place of Birth" content={placeOfBitrh} />
						)}

						{birthday?.length > 0 && (
							<Information
								title="Birthday"
								content={getDateWithYear(new Date(birthday))}
							/>
						)}

						{deathday?.length > 0 && (
							<Information
								title="Deathday"
								content={getDateWithYear(new Date(deathday))}
							/>
						)}
					</Section>
				</VStack>
			</ScrollView>
		</>
	);
};

export default PersonScreen;
