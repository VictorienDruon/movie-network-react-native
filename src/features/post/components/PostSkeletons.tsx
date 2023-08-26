import { VStack, HStack, Skeleton } from "@/components/ui";

const PostSkeletons = ({ count }: { count: number }) => (
	<>
		{Array.from({ length: count }).map((_, index) => (
			<VStack key={index} space={8} p={16}>
				<HStack space={8} alignItems="center">
					<Skeleton width={40} height={40} borderRadius="full" />
					<VStack flex={1} space={4}>
						<Skeleton width={100} height={16} />
						<Skeleton width={80} height={16} />
					</VStack>
					<Skeleton width={40} height={16} />
				</HStack>
				<Skeleton width="100%" height={32} />
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
