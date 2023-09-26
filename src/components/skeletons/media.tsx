import { FlatList } from "react-native";
import { Stack } from "expo-router";
import { VStack, Skeleton, HStack, Title, Button, Box } from "@/components/ui";
import PersonSkeleton from "@/features/person/components/PersonSkeleton";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";
import { Section } from "../layouts";

export const MediaSkeleton = () => (
	<>
		<Stack.Screen options={{ title: "" }} />

		<VStack space={24}>
			<Box zIndex={1} bg="neutral-3">
				<Skeleton width="100%" aspectRatio={16 / 9} />
			</Box>

			<Section space={4}>
				<Skeleton width={256} height={24} borderRadius="md" />
				<Skeleton width={128} height={18} borderRadius="md" />
			</Section>

			<Section>
				<Button variant="primary" leftIcon="Play" fillIcon={true}>
					Play
				</Button>
				<Button variant="outline" leftIcon="Plus">
					Add to Watchlist
				</Button>
			</Section>

			<Section space={4}>
				<Skeleton width="100%" height={16} borderRadius="md" />
				<Skeleton width="100%" height={16} borderRadius="md" />
				<Skeleton width="30%" height={16} borderRadius="md" />
			</Section>

			<Section>
				<HStack space={8}>
					<Skeleton width={80} height={26} borderRadius="lg" />
					<Skeleton width={80} height={26} borderRadius="lg" />
					<Skeleton width={80} height={26} borderRadius="lg" />
				</HStack>
			</Section>

			<Section title="Recommendations" flatlist>
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => <PosterSkeleton mx={8} />}
					contentContainerStyle={{ paddingHorizontal: 8 }}
					horizontal={true}
				/>
			</Section>

			<Section title="Cast" flatlist>
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => <PersonSkeleton mx={4} />}
					contentContainerStyle={{ paddingHorizontal: 12 }}
					horizontal={true}
				/>
			</Section>
		</VStack>
	</>
);
