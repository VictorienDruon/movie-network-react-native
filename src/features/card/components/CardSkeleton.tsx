import { BoxProps, Skeleton, VStack } from "@/components/ui";

const CardSkeleton = (props: BoxProps) => (
	<VStack space={2} {...props}>
		<Skeleton width={100} aspectRatio={5 / 7} borderRadius="sm" />
		<Skeleton width={100} height={16} />
	</VStack>
);

export default CardSkeleton;
