import { VStack, HStack, Skeleton } from "@/components/ui";

const CommentSkeletons = ({ count }: { count: number }) => (
	<>
		{Array.from({ length: count }).map((_, index) => (
			<HStack key={index} space={8} p={16}>
				<Skeleton width={28} height={28} borderRadius="full" />
				<VStack space={4} flex={1}>
					<Skeleton width={100} height={16} />
					<Skeleton width="100%" height={32} />
				</VStack>
				<Skeleton width={40} height={16} />
			</HStack>
		))}
	</>
);

export default CommentSkeletons;
