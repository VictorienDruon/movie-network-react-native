import { useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pluralize } from "@/utils/texts";
import { useSession } from "@/providers/session";
import { supabase } from "@/libs/supabase";
import { getProfile } from "@/libs/supabase/api/profiles";
import { handleFollowSuccess, toggleFollow } from "@/libs/supabase/api/follows";
import { ErrorState } from "@/components/commons";
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

const ProfileScreen = () => {
	const { width } = Dimensions.get("screen");
	const { id } = useLocalSearchParams<{ id: string }>();
	const { user } = useSession();
	const activities = ["posts", "likes", "comments"];
	const activitiesRef = useRef<Animated.FlatList>(null);
	const scrollX = useRef(new Animated.Value(0)).current;

	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ["profile", id],
		queryFn: () => getProfile(id),
	});

	const mutation = useMutation(toggleFollow, {
		onSuccess: (folllow) => handleFollowSuccess(folllow, queryClient),
	});

	const handleFollowPress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({
			follower_id: user.id,
			followed_id: id,
			is_user_following: query.data.isUserFollowing,
		});
	};

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<VStack space={16}>
			{query.isLoading ? (
				<VStack p={16} space={8}>
					<Skeleton width={64} height={64} borderRadius="full" />
					<Skeleton width={96} height={24} borderRadius="md" />
					<Skeleton width={200} height={16} borderRadius="md" />
				</VStack>
			) : (
				<HStack
					justifyContent="space-between"
					alignItems="flex-end"
					p={16}
					space={8}
				>
					<VStack space={8}>
						<Avatar
							size={64}
							src={query.data.avatarUrl}
							alt={`${query.data.name} avatar`}
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

					{user.id === id ? (
						<Button
							variant="secondaryOutline"
							size="lg"
							onPress={() => router.push("/profile/settings")}
						>
							Settings
						</Button>
					) : (
						<Button
							variant={
								query.data.isUserFollowing ? "secondaryOutline" : "secondary"
							}
							size="lg"
							disabled={mutation.isLoading}
							onPress={handleFollowPress}
						>
							{query.data.isUserFollowing ? "Unfollow" : "Follow"}
						</Button>
					)}
				</HStack>
			)}

			<Tabs tabs={activities} contentRef={activitiesRef} scrollX={scrollX} />

			<Animated.FlatList
				ref={activitiesRef}
				data={activities}
				keyExtractor={(activity) => activity}
				renderItem={({ item: activity }) => {
					switch (activity) {
						case "posts":
							return <PostsTab userId={id} />;
						case "likes":
							return <LikesTab userId={id} />;
						case "comments":
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
		</VStack>
	);
};

export default ProfileScreen;