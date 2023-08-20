import { Animated } from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";
import { Database } from "@/libs/supabase/types/database.types";
import { VStack, Heading, Avatar, Box } from "@/components/ui";
import { Activity } from "./components/Activity";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
	activities: Activity[];
};

interface ProfileProps {
	profile: Profile;
	refetch: () => Promise<QueryObserverResult>;
}

export const Profile = ({ profile, refetch }: ProfileProps) => {
	const { id, name, avatar_url, activities } = profile;

	return (
		<Box flex={1} pt={64}>
			<VStack space={4} pl={16} bg="neutral-1">
				<Avatar size={64} src={avatar_url} alt={name} />
				<Heading>{name}</Heading>
			</VStack>
			<Animated.FlatList
				data={activities}
				keyExtractor={(activity) => activity.type}
				renderItem={({ item: activity }) => (
					<Activity activity={activity} refetch={refetch} />
				)}
				showsHorizontalScrollIndicator={false}
				bounces={false}
				pagingEnabled
				horizontal
			/>
		</Box>
	);
};
