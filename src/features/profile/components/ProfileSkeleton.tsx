import { VStack, Skeleton } from "@/components/ui";

const ProfileSkeleton = () => (
	<VStack p={16} space={8}>
		<Skeleton width={64} height={64} borderRadius="full" />
		<Skeleton width={96} height={20} />
		<Skeleton width={200} height={16} />
	</VStack>
);

export default ProfileSkeleton;
