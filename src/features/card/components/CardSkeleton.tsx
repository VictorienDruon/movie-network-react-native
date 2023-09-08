import { BoxProps, Skeleton, VStack } from "@/components/ui";

const CardSkeleton = (props: BoxProps) => (
	<VStack space={4} {...props}>
		<Skeleton
			width={100}
			aspectRatio={5 / 7}
			borderRadius="sm"
			borderWidth={1}
			borderColor="neutral-6"
		/>
		<Skeleton width={100} height={12} borderRadius="full" />
	</VStack>
);

export default CardSkeleton;
