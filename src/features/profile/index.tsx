import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { Database } from "@/libs/supabase/types/database.types";
import { NewFollow, toggle } from "@/libs/supabase/api/follows";
import { useSession } from "@/providers/session";
import { HStack, VStack, Avatar, Heading, Button, Body } from "@/components/ui";
import { pluralize } from "@/utils/text";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
	following: number;
	followers: number;
	is_user_following: boolean;
};

export const Profile = ({ profile }: { profile: Profile }) => {
	const { id, name, avatar_url, following, followers, is_user_following } =
		profile;
	const queryClient = useQueryClient();
	const { user } = useSession();

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
			is_user_following,
		});
	};

	return (
		<HStack
			justifyContent="space-between"
			alignItems="flex-end"
			p={16}
			space={8}
		>
			<VStack space={8}>
				<Avatar size={64} src={avatar_url} alt={name} />

				<Heading>{name}</Heading>

				<HStack space={6}>
					<Link
						href={{
							pathname: "/(app)/profile/[id]/following",
							params: { id },
						}}
						asChild
					>
						<TouchableOpacity>
							<HStack space={4}>
								<Body fontWeight="bold">{following}</Body>
								<Body>Following</Body>
							</HStack>
						</TouchableOpacity>
					</Link>

					<Body>•</Body>

					<Link
						href={{
							pathname: "/(app)/profile/[id]/followers",
							params: { id },
						}}
						asChild
					>
						<TouchableOpacity>
							<HStack space={4}>
								<Body fontWeight="bold">{followers}</Body>
								<Body>{pluralize(followers, "Follower")}</Body>
							</HStack>
						</TouchableOpacity>
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
					variant={is_user_following ? "secondaryOutline" : "secondary"}
					size="lg"
					disabled={mutation.isLoading}
					onPress={handleFollowPress}
				>
					{is_user_following ? "Unfollow" : "Follow"}
				</Button>
			)}
		</HStack>
	);
};
