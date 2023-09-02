import { BoxProps, HStack, Skeleton } from "@/components/ui";

interface UserSkeletonsProps extends BoxProps {
	count?: number;
}

const UserSkeletons = ({ count = 1, ...props }: UserSkeletonsProps) => (
	<>
		{Array.from({ length: count }).map((_, index) => (
			<HStack key={index} space={8} alignItems="center" {...props}>
				<Skeleton width={40} height={40} borderRadius="full" />
				<Skeleton width={120} height={20} />
			</HStack>
		))}
	</>
);

export default UserSkeletons;
