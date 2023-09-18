import { FlatList } from "react-native";
import { VStack, Skeleton, HStack, Title, Button, Box } from "@/components/ui";
import PersonSkeleton from "@/features/persons/components/PersonSkeleton";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";

const DetailsSkeleton = () => (
	<VStack space={20}>
		<Box
			zIndex={1}
			bg="neutral-3"
			shadowColor="black"
			shadowOffset={{ width: 0, height: 10 }}
			shadowOpacity={0.2}
			shadowRadius={10}
			elevation={5}
		>
			<Skeleton width="100%" aspectRatio={16 / 9} />
		</Box>

		<VStack px={16} space={4}>
			<Skeleton width={256} height={24} borderRadius="md" />
			<Skeleton width={128} height={18} borderRadius="md" />
		</VStack>

		<VStack px={16} space={8}>
			<Button variant="primary" leftIcon="Play" fillIcon={true}>
				Play
			</Button>
			<Button variant="outline" leftIcon="Plus">
				Add to Watchlist
			</Button>
		</VStack>

		<VStack px={16} space={4}>
			<Skeleton width="100%" height={16} borderRadius="md" />
			<Skeleton width="100%" height={16} borderRadius="md" />
			<Skeleton width="30%" height={16} borderRadius="md" />
		</VStack>

		<HStack px={16} space={8}>
			<Skeleton width={64} height={20} borderRadius="lg" />
			<Skeleton width={64} height={20} borderRadius="lg" />
			<Skeleton width={64} height={20} borderRadius="lg" />
		</HStack>

		<VStack space={8}>
			<Title pl={16}>Recommendations</Title>
			<FlatList
				data={Array.from({ length: 4 }, (_, i) => i)}
				keyExtractor={(item) => item.toString()}
				renderItem={() => <PosterSkeleton mx={8} />}
				contentContainerStyle={{ paddingHorizontal: 8 }}
				horizontal={true}
				scrollEnabled={false}
			/>
		</VStack>

		<VStack space={8}>
			<Title pl={16}>Cast</Title>
			<FlatList
				data={Array.from({ length: 4 }, (_, i) => i)}
				keyExtractor={(item) => item.toString()}
				renderItem={() => <PersonSkeleton mx={4} />}
				contentContainerStyle={{ paddingHorizontal: 12 }}
				horizontal={true}
				scrollEnabled={false}
			/>
		</VStack>
	</VStack>
);

export default DetailsSkeleton;