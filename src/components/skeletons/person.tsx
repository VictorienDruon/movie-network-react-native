import { FlatList } from "react-native";
import { Stack } from "expo-router";
import { Skeleton, VStack } from "../ui";
import { Section } from "../layouts";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";

export const PersonSkeleton = () => (
	<>
		<Stack.Screen options={{ title: "" }} />

		<VStack pt={24} space={24}>
			<Skeleton width={256} height={28} mx={16} borderRadius="md" />

			<Section title="Movies" size="lg" flatlist>
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => <PosterSkeleton mx={8} />}
					contentContainerStyle={{ paddingHorizontal: 8 }}
					horizontal={true}
					scrollEnabled={false}
				/>
			</Section>

			<Section title="Shows" size="lg" flatlist>
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => <PosterSkeleton mx={8} />}
					contentContainerStyle={{ paddingHorizontal: 8 }}
					horizontal={true}
					scrollEnabled={false}
				/>
			</Section>

			<Section title="Director" size="lg" flatlist>
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => <PosterSkeleton mx={8} />}
					contentContainerStyle={{ paddingHorizontal: 8 }}
					horizontal={true}
					scrollEnabled={false}
				/>
			</Section>
		</VStack>
	</>
);
