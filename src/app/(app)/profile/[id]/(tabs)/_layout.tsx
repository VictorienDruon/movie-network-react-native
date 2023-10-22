import { createContext, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { TopTabs } from "@bacons/expo-router-top-tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/providers/session";
import { supabase } from "@/libs/supabase";
import { handleFollowSuccess, toggleFollow } from "@/libs/supabase/api/follows";
import { getProfile } from "@/libs/supabase/api/profiles";
import { pluralize } from "@/utils/texts";
import { ErrorState } from "@/components/commons";
import {
	VStack,
	Skeleton,
	Button,
	Body,
	HStack,
	Heading,
	Avatar,
	Link,
} from "@/components/ui";

const ParamsContext = createContext<{ [key: string]: any }>(null);

const ProfileTabsLayout = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { user } = useSession();

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
		<ParamsContext.Provider value={{ userId: id }}>
			<TopTabs>
				<TopTabs.Header>
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
										query.data.isUserFollowing
											? "secondaryOutline"
											: "secondary"
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
				</TopTabs.Header>
				<TopTabs.Screen name="posts" />

				<TopTabs.Screen name="likes" />

				<TopTabs.Screen name="comments" />
			</TopTabs>
		</ParamsContext.Provider>
	);
};

export const useParams = () => useContext(ParamsContext);

export default ProfileTabsLayout;
