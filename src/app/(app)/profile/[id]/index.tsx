import { useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { pluralize } from "@/utils/texts";
import useUser from "@/hooks/useUser";
import { getProfile } from "@/libs/supabase/api/profiles";
import { EmptyState, ErrorState } from "@/components/commons";
import {
	Avatar,
	Body,
	Box,
	Button,
	HStack,
	Heading,
	Link,
	Skeleton,
	VStack,
} from "@/components/ui";
import Tabs from "@/components/Tabs";
import PostsTab from "@/features/profile/PostsTab";
import LikesTab from "@/features/profile/LikesTab";
import CommentsTab from "@/features/profile/CommentsTab";
import FollowButton from "@/features/profile/FollowButton";
import BlockUserButton from "@/features/profile/BlockUserButton";

const ProfileScreen = () => {
	const { width } = Dimensions.get("screen");
	const { id } = useLocalSearchParams<{ id: string }>();
	const user = useUser();
	const activities = ["Posts", "Likes", "Comments"];
	const activitiesRef = useRef<Animated.FlatList>(null);
	const scrollX = useRef(new Animated.Value(0)).current;

	const query = useQuery({
		queryKey: ["profile", id],
		queryFn: () => getProfile(id),
	});

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1}>
			<VStack space={8} borderBottomWidth={1} borderColor="neutral-6">
				{query.isLoading ? (
					<VStack p={16} space={8}>
						<Skeleton width={64} height={64} borderRadius="full" />
						<Skeleton width={150} height={24} borderRadius="md" />
						<Skeleton width={200} height={18} borderRadius="md" />
					</VStack>
				) : (
					<HStack justifyContent="space-between" p={16} space={8}>
						<VStack space={8}>
							<Avatar
								size={64}
								src={query.data.avatarUrl}
								name={query.data.name}
							/>

							<Heading>{query.data.name}</Heading>

							<HStack space={6}>
								<Link
									href={{
										pathname: "/profile/[id]/following",
										params: { id },
									}}
								>
									<HStack space={4}>
										<Body fontWeight="bold">{query.data.following}</Body>
										<Body>Following</Body>
									</HStack>
								</Link>

								<Body>•</Body>

								<Link
									href={{
										pathname: "/profile/[id]/followers",
										params: { id },
									}}
								>
									<HStack space={4}>
										<Body fontWeight="bold">{query.data.followers}</Body>
										<Body>{pluralize(query.data.followers, "Follower")}</Body>
									</HStack>
								</Link>
							</HStack>
						</VStack>

						<VStack
							justifyContent="space-between"
							alignItems="flex-end"
							space={16}
						>
							{user.id !== id && (
								<BlockUserButton
									blockedUserId={id}
									isUserBlocked={query.data.isUserBlocked}
									isUserFollowing={query.data.isUserFollowing}
								/>
							)}

							{!query.data.isUserBlocked &&
								(user.id === id ? (
									<Button
										variant="secondaryOutline"
										size="lg"
										onPress={() => router.push("/profile/edit")}
									>
										Edit
									</Button>
								) : (
									<FollowButton
										id={id}
										isUserFollowing={query.data.isUserFollowing}
									/>
								))}
						</VStack>
					</HStack>
				)}

				<Tabs tabs={activities} contentRef={activitiesRef} scrollX={scrollX} />
			</VStack>

			{query.data &&
				(query.data.isUserBlocked ? (
					<EmptyState>
						You have blocked this user. To see their posts, you need to unblock
						them.
					</EmptyState>
				) : (
					<Animated.FlatList
						ref={activitiesRef}
						data={activities}
						keyExtractor={(activity) => activity}
						renderItem={({ item: activity }) => {
							switch (activity) {
								case "Posts":
									return <PostsTab userId={id} />;
								case "Likes":
									return <LikesTab userId={id} />;
								case "Comments":
									return <CommentsTab userId={id} />;
							}
						}}
						CellRendererComponent={({ children }) => (
							<Box width={width}>{children}</Box>
						)}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { x: scrollX } } }],
							{ useNativeDriver: false }
						)}
						showsHorizontalScrollIndicator={false}
						bounces={false}
						pagingEnabled
						horizontal
					/>
				))}
		</Box>
	);
};

export default ProfileScreen;
