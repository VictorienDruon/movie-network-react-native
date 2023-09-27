import { BoxProps, Skeleton, VStack } from "@/components/ui";

interface PersonCardSkeletonProps extends BoxProps {
	withRole?: boolean;
}

const PersonCardSkeleton = ({ withRole = true, ...props }: PersonCardSkeletonProps) => (
	<VStack alignItems="center" width={96} space={2} {...props}>
		<Skeleton width={80} height={80} borderRadius="full" />

		<Skeleton width={80} height={14} borderRadius="md" />

		{withRole && <Skeleton width={64} height={14} borderRadius="md" />}
	</VStack>
);

export default PersonCardSkeleton;
