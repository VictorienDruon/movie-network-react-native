import { VStack, HStack, Skeleton } from "@/components/ui";

const CommentSkeleton = () => (
	<HStack space={8} p={16}>
		<Skeleton width={28} height={28} borderRadius="full" />

		<VStack space={8} flex={1}>
			<Skeleton width={100} height={20} borderRadius="md" />
			<VStack space={2}>
				<Skeleton width="100%" height={16} borderRadius="md" />
				<Skeleton width="80%" height={16} borderRadius="md" />
			</VStack>
		</VStack>

		<Skeleton width={40} height={12} borderRadius="md" />
	</HStack>
);

export default CommentSkeleton;
