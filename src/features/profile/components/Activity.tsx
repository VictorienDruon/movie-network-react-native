import { useCallback, useState } from "react";
import {
	Dimensions,
	FlatList,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";
import { Box } from "@/components/ui";
import { Post } from "@/features/post";
import { Comment } from "@/features/comment";
import { Link } from "expo-router";

export type Activity = {
	label: string;
	items: (Post | Comment)[];
};

interface ActivityProps {
	activity: Activity;
	refetch: () => Promise<QueryObserverResult>;
}

export const Activity = ({ activity, refetch }: ActivityProps) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const { width } = Dimensions.get("screen");

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}, []);

	return (
		<Box width={width}>
			{activity.label === "comments" ? (
				<FlatList
					data={activity.items as Comment[]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Link
							href={{
								pathname: "/(app)/post/[id]",
								params: { id: item.post_id },
							}}
							asChild
						>
							<TouchableOpacity>
								<Comment comment={item} />
							</TouchableOpacity>
						</Link>
					)}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
					}
				/>
			) : (
				<FlatList
					data={activity.items as Post[]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Post post={item} />}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
					}
				/>
			)}
		</Box>
	);
};
