import { VStack, HStack, Skeleton, Box } from "@/components/ui";
import PosterCardSkeleton from "@/features/poster-card/components/PosterSkeleton";

const PostSkeleton = () => (
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

		<Box position="relative" alignItems="center" maxHeight={280}>
			<PosterCardSkeleton size="md" textPosition="top" right={50} rotate="-3deg" />
			<PosterCardSkeleton
				size="md"
				textPosition="top"
				top={-140}
				left={50}
				rotate="3deg"
			/>
		</Box>

		<HStack space={8}>
			<Skeleton flex={1} height={40} borderRadius="xl" />
			<Skeleton width={40} height={40} borderRadius="full" />
			<Skeleton width={40} height={40} borderRadius="full" />
		</HStack>
	</VStack>
);

export default PostSkeleton;
