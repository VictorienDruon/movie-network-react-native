import { BoxProps, Skeleton, VStack } from "@/components/ui";

type PosterSize = "sm" | "md" | "lg";

interface PosterSkeletonProps extends BoxProps {
	size?: PosterSize;
	textPosition?: "top" | "bottom";
}

const PosterSkeleton = ({
	size = "sm",
	textPosition = "bottom",
	...props
}: PosterSkeletonProps) => (
	<VStack
		position="relative"
		alignItems="center"
		space={2}
		{...boxSizes[size]}
		{...props}
	>
		<Skeleton aspectRatio={5 / 7} borderRadius="sm" {...boxSizes[size]} />

		{textPosition === "bottom" && (
			<Skeleton width="80%" height={13} borderRadius="md" />
		)}
	</VStack>
);

const boxSizes: { [key in PosterSize]: BoxProps } = {
	lg: {
		width: 200,
	},
	md: {
		width: 150,
	},
	sm: {
		width: 100,
	},
};

export default PosterSkeleton;
