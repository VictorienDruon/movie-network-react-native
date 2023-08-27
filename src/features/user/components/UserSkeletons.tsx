import { HStack, Skeleton } from "@/components/ui";

const UserSkeletons = ({ count = 1 }) => (
	<>
		{Array.from({ length: count }).map((_, index) => (
			<HStack key={index} p={16} space={8} alignItems="center">
				<Skeleton width={40} height={40} borderRadius="full" />
				<Skeleton width={200} height={20} />
			</HStack>
		))}
	</>
);

export default UserSkeletons;
