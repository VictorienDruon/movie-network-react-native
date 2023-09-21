import { FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/libs/axios/api/collection";
import Collection from "@/libs/axios/types/Collection";
import { ErrorState } from "@/components/commons";
import { CollectionSkeleton } from "@/components/skeletons";
import { Body, Heading, Image, VStack, LinearGradient } from "@/components/ui";
import { Poster } from "@/features/poster";

const CollectionScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Collection, Error>({
		queryKey: ["collection", id],
		queryFn: () => getCollection(id),
	});

	if (query.isLoading) return <CollectionSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const { name, backdrop_path, overview, parts } = query.data;

	return (
		<>
			<Stack.Screen options={{ title: name }} />

			<FlatList
				data={parts}
				keyExtractor={(part) => part.tmdb_id.toString()}
				ListHeaderComponent={() => (
					<VStack alignItems="center" space={16} pb={16}>
						<Image
							src={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}/w500${backdrop_path}`}
							alt={name}
							width="100%"
							aspectRatio={16 / 9}
						>
							<LinearGradient />
						</Image>

						<Heading px={16}>{name}</Heading>

						{overview?.length > 0 && <Body px={16}>{overview}</Body>}
					</VStack>
				)}
				renderItem={({ item }) => (
					<Poster
						poster={item}
						size="md"
						textPosition="top"
						decoration="shadow"
					/>
				)}
				numColumns={2}
				contentContainerStyle={{ paddingBottom: 128 }}
				columnWrapperStyle={{
					justifyContent: "space-between",
					paddingHorizontal: 32,
					paddingVertical: 16,
				}}
			/>
		</>
	);
};

export default CollectionScreen;
