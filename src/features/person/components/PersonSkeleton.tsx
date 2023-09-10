import { Skeleton, VStack } from "@/components/ui";

const PersonSkeleton = () => (
	<VStack alignItems="center" width={96} space={2}>
		<Skeleton width={80} height={80} borderRadius="full" />

		<Skeleton width={80} height={12} borderRadius="md" />

		<Skeleton width={64} height={10} borderRadius="md" />
	</VStack>
);

export default PersonSkeleton;
