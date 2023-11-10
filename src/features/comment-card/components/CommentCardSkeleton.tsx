import { VStack, HStack, Skeleton } from "@/components/ui";

const CommentCardSkeleton = () => (
	<HStack space={8} p={16}>
		<Skeleton width={40} height={40} borderRadius="full" />

		<VStack space={8} flex={1}>
			<Skeleton width={200} height={20} borderRadius="md" />

			<VStack space={4}>
				<Skeleton width="100%" height={14} borderRadius="md" />
				<Skeleton width="80%" height={14} borderRadius="md" />
			</VStack>
		</VStack>
	</HStack>
);

export default CommentCardSkeleton;
