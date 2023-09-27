import { AnimatableStringValue } from "react-native";
import { BoxProps, Skeleton, VStack } from "@/components/ui";

type PosterCardSize = "sm" | "md" | "lg";

interface PosterCardSkeletonProps extends BoxProps {
	size?: PosterCardSize;
	textPosition?: "top" | "bottom";
	rotate?: AnimatableStringValue;
	gridSpacing?: number;
}

const PosterCardSkeleton = ({
	size = "sm",
	textPosition = "bottom",
	rotate,
	...props
}: PosterCardSkeletonProps) => (
	<VStack
		position="relative"
		alignItems="center"
		space={2}
		style={[rotate && { transform: [{ rotate: rotate }] }]}
		{...boxSizes[size]}
		{...props}
	>
		<Skeleton aspectRatio={5 / 7} borderRadius="sm" {...boxSizes[size]} />

		{textPosition === "bottom" && (
			<Skeleton width="80%" height={18} borderRadius="md" />
		)}
	</VStack>
);

const boxSizes: { [key in PosterCardSize]: BoxProps } = {
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

export default PosterCardSkeleton;
