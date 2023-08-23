import { useRef } from "react";
import { Animated } from "react-native";
import { Database } from "@/libs/supabase/types/database.types";
import { VStack, Heading, Avatar, Box } from "@/components/ui";
import Tabs from "@/components/Tabs";
import Posts from "./components/Posts";
import Likes from "./components/Likes";
import Comments from "./components/Comments";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const Profile = ({ profile }: { profile: Profile }) => {
	const { id, name, avatar_url } = profile;
	const activities = ["posts", "likes", "comments"];
	const activitiesRef = useRef<Animated.FlatList>(null);
	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<Box flex={1} pt={16}>
			<VStack
				space={16}
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
				keyExtractor={(activity) => activity}
				renderItem={({ item: activity }) => {
					switch (activity) {
						case "posts":
							return <Posts userId={id} />;
						case "likes":
							return <Likes userId={id} />;
						case "comments":
							return <Comments userId={id} />;
					}
				}}
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
