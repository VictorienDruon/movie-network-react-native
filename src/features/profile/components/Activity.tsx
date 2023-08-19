import { useCallback, useState } from "react";
import { Dimensions, FlatList, RefreshControl } from "react-native";
import { Box } from "@/components/ui";
import { Post } from "@/features/post";
import { Comment } from "@/features/comment";

export type Activity = {
	type: string;
	items: (Post | Comment)[];
};

export const Activity = ({ activity }: { activity: Activity }) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const { width } = Dimensions.get("screen");

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		setRefreshing(false);
	}, []);

	return (
		<Box width={width}>
			{activity.type === "comments" ? (
				<FlatList
					data={activity.items as Comment[]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Comment comment={item} />}
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
