import { BoxProps, Skeleton, VStack } from "@/components/ui";

const CardSkeleton = (props: BoxProps) => (
	<VStack space={4} {...props}>
		<Skeleton width={100} aspectRatio={5 / 7} borderRadius="sm" />
		<Skeleton width={100} height={12} />
	</VStack>
);

export default CardSkeleton;
