import { createContext, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { TopTabs } from "@bacons/expo-router-top-tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/providers/session";
import { supabase } from "@/libs/supabase";
import { NewFollow, toggle } from "@/libs/supabase/api/follows";
import { Database } from "@/libs/supabase/types/database.types";
import { getOne } from "@/libs/supabase/api/profiles";
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

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
	following: number;
	followers: number;
	is_user_following: boolean;
};

const ParamsContext = createContext<{ [key: string]: any }>(null);

const ProfileTabsLayout = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { user } = useSession();
	const queryClient = useQueryClient();

	const query = useQuery<Profile, Error>({
		queryKey: ["profile", id],
		queryFn: () => getOne(id),
	});

	const mutation = useMutation<NewFollow, Error, NewFollow>(toggle, {
		onSuccess: ({ follower_id, followed_id }) => {
			queryClient.invalidateQueries({
				queryKey: ["profile", followed_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["followers", followed_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["profile", follower_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["following", follower_id],
			});
		},
	});

	const handleFollowPress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({
			follower_id: user.id,
			followed_id: id,
			is_user_following: query.data.is_user_following,
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
									src={query.data.avatar_url}
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
									onPress={() => supabase.auth.signOut()}
								>
									Sign Out
								</Button>
							) : (
								<Button
									variant={
										query.data.is_user_following
											? "secondaryOutline"
											: "secondary"
									}
									size="lg"
									disabled={mutation.isLoading}
									onPress={handleFollowPress}
								>
									{query.data.is_user_following ? "Unfollow" : "Follow"}
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
