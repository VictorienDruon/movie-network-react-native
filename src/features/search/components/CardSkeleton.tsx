import { FlatList } from "react-native";
import { Box, Skeleton, VStack } from "@/components/ui";

interface CardSkeletonsProps {
	count: number;
	margin: number;
}

const CardSkeletons = ({ count, margin }: CardSkeletonsProps) => (
	<FlatList
		data={Array.from({ length: count }, (_, index) => index)}
		numColumns={3}
		keyExtractor={(item) => item.toString()}
		renderItem={() => (
			<VStack alignItems="center" width={100} space={4} style={{ margin }}>
				<Box
					overflow="hidden"
					borderRadius="sm"
					borderWidth={1}
					borderColor="neutral-3"
				>
					<Skeleton width={100} height={150} borderRadius="none" />
				</Box>
				<Skeleton width={80} height={12} />
			</VStack>
		)}
		showsVerticalScrollIndicator={false}
	/>
);

export default CardSkeletons;
