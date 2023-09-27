import { Stack } from "expo-router";
import { Skeleton, VStack } from "../ui";
import { FlatList } from "react-native";
import PosterCardSkeleton from "@/features/poster-card/components/PosterSkeleton";

export const CollectionSkeleton = () => (
	<>
		<Stack.Screen options={{ title: "" }} />

		<FlatList
			data={Array.from({ length: 10 }, (_, i) => i)}
			keyExtractor={(item) => item.toString()}
			ListHeaderComponent={() => (
				<VStack alignItems="center" space={16} pb={16}>
					<Skeleton width="100%" aspectRatio={16 / 9} />

					<Skeleton width={256} height={24} mx={16} borderRadius="md" />

					<VStack width="100%" space={4} px={16}>
						<Skeleton width="100%" height={18} borderRadius="md" />
						<Skeleton width="100%" height={18} borderRadius="md" />
						<Skeleton width="60%" height={18} borderRadius="md" />
					</VStack>
				</VStack>
			)}
			renderItem={() => <PosterCardSkeleton size="md" textPosition="top" />}
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
