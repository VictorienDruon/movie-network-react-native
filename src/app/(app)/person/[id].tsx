import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "@/libs/axios/api/person";
import Person from "@/libs/axios/types/Person";
import { getDateWithYear } from "@/utils/dates";
import { Body, Heading, Title, VStack } from "@/components/ui";
import Information from "@/components/layouts/information";
import { Poster } from "@/features/poster";

const PersonScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Person, Error>({
		queryKey: ["person", id],
		queryFn: () => getPerson(id),
	});

	if (query.isLoading) return <Stack.Screen options={{ title: "" }} />;

	if (query.isError) return null;

	const {
		name,
		movies,
		tv,
		directions,
		writings,
		productions,
		biography,
		place_of_birth,
		birthday,
		deathday,
		department,
	} = query.data;

	return (
		<>
			<Stack.Screen options={{ title: name }} />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 20,
					paddingBottom: 64,
				}}
			>
				<VStack space={20}>
					<Heading px={16} fontSize={24} lineHeight={28}>
						{name}
					</Heading>

					<VStack space={8}>
						<Title px={16}>Movies</Title>
						<FlatList
							data={movies}
							keyExtractor={(m) => "movie" + m.tmdb_id.toString()}
							renderItem={({ item: movie }) => (
								<Poster poster={movie} orientation="horizontal" mx={8} />
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>

					<VStack space={8}>
						<Title px={16}>TV Shows</Title>
						<FlatList
							data={tv}
							keyExtractor={(tv) => "tv" + tv.tmdb_id.toString()}
							renderItem={({ item: tv }) => (
								<Poster poster={tv} orientation="horizontal" mx={8} />
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>

					<VStack space={8}>
						<Title px={16}>Directing</Title>
						<FlatList
							data={directions}
							keyExtractor={(d) => "direction" + d.tmdb_id.toString()}
							renderItem={({ item: direction }) => (
								<Poster poster={direction} orientation="horizontal" mx={8} />
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>

					<VStack space={8}>
						<Title px={16}>Writing</Title>
						<FlatList
							data={writings}
							keyExtractor={(w) => "writing" + w.tmdb_id.toString()}
							renderItem={({ item: writing }) => (
								<Poster poster={writing} orientation="horizontal" mx={8} />
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>

					<VStack space={8}>
						<Title px={16}>Producing</Title>
						<FlatList
							data={productions}
							keyExtractor={(p) => "production" + p.tmdb_id.toString()}
							renderItem={({ item: production }) => (
								<Poster poster={production} orientation="horizontal" mx={8} />
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>

					{biography?.length > 0 && (
						<VStack px={16} space={8}>
							<Title>Biography</Title>
							<Body>{biography}</Body>
						</VStack>
					)}

					<VStack px={16} space={4}>
						<Title>Informations</Title>

						{department?.length > 0 && (
							<Information title="Department" content={department} />
						)}

						{place_of_birth?.length > 0 && (
							<Information title="Place of Birth" content={place_of_birth} />
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
					</VStack>
				</VStack>
			</ScrollView>
		</>
	);
};

export default PersonScreen;
