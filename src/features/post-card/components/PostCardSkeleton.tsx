import { VStack, HStack, Skeleton, Box } from "@/components/ui";
import PosterCardsLayoutSkeleton from "@/features/poster-card/components/PosterCardsLayoutSkeleton";

const PostCardSkeleton = () => (
	<VStack space={20} p={16}>
		<HStack justifyContent="space-between" space={8}>
			<HStack space={8} alignItems="center">
				<Skeleton width={40} height={40} borderRadius="full" />
				<Skeleton width={128} height={20} borderRadius="md" />
			</HStack>
			<Skeleton width={64} height={12} borderRadius="md" />
		</HStack>

		<VStack space={4}>
			<Skeleton width="100%" height={16} borderRadius="md" />
			<Skeleton width="30%" height={16} borderRadius="md" />
		</VStack>

		<PosterCardsLayoutSkeleton length={2} />

		<HStack space={8}>
			<Skeleton flex={1} height={40} borderRadius="xl" />
			<Skeleton width={40} height={40} borderRadius="full" />
			<Skeleton width={40} height={40} borderRadius="full" />
		</HStack>
	</VStack>
);

export default PostCardSkeleton;
