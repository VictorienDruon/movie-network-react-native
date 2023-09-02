import { VStack, HStack, Skeleton } from "@/components/ui";
import UserSkeletons from "@/features/user/components/UserSkeletons";

const PostSkeletons = ({ count = 1 }) => (
	<>
		{Array.from({ length: count }).map((_, index) => (
			<VStack key={index} space={20} p={16}>
				<HStack justifyContent="space-between" space={8}>
					<UserSkeletons />
					<Skeleton width={40} height={16} />
				</HStack>
				<Skeleton width="100%" height={64} />
				<HStack space={8}>
					<Skeleton flex={1} maxHeight={40} borderRadius="full" />
					<Skeleton width={40} height={40} borderRadius="full" />
					<Skeleton width={40} height={40} borderRadius="full" />
				</HStack>
			</VStack>
		))}
	</>
);

export default PostSkeletons;
