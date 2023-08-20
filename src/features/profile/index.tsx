import { useRef } from "react";
import { Animated } from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";
import { Database } from "@/libs/supabase/types/database.types";
import { VStack, Heading, Avatar, Box } from "@/components/ui";
import Tabs from "@/components/Tabs";
import { Activity } from "./components/Activity";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
	activities: Activity[];
};

interface ProfileProps {
	profile: Profile;
	refetch: () => Promise<QueryObserverResult>;
}

export const Profile = ({ profile, refetch }: ProfileProps) => {
	const { name, avatar_url, activities } = profile;
	const activitiesRef = useRef<Animated.FlatList>(null);
	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<Box flex={1} pt={64}>
			<VStack
				space={8}
				px={16}
				borderBottomWidth={0.25}
				borderBottomColor="neutral-6"
			>
				<Avatar size={64} src={avatar_url} alt={name} />

				<Heading>{name}</Heading>

				<Tabs tabs={activities} contentRef={activitiesRef} scrollX={scrollX} />
			</VStack>

			<Animated.FlatList
				ref={activitiesRef}
				data={activities}
				keyExtractor={(activity) => activity.label}
				renderItem={({ item: activity }) => (
					<Activity activity={activity} refetch={refetch} />
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
		</Box>
	);
};
