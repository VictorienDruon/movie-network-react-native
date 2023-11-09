import { Platform } from "react-native";
import { Stack } from "expo-router";
import { Link, Title } from "@/components/ui";

const AppLayout = () => (
	<Stack>
		<Stack.Screen name="(drawer)" options={{ headerShown: false }} />

		<Stack.Screen name="profile/[id]/index" options={{ title: "Profile" }} />
		<Stack.Screen
			name="profile/[id]/following"
			options={{ title: "Following", presentation: "modal" }}
		/>
		<Stack.Screen
			name="profile/[id]/followers"
			options={{ title: "Followers", presentation: "modal" }}
		/>
		<Stack.Screen name="profile/edit" options={{ title: "Edit" }} />
		<Stack.Screen name="profile/settings" options={{ title: "Settings" }} />

		<Stack.Screen
			name="post/create"
			options={{
				title: "Create a Post",
				presentation: Platform.OS === "ios" ? "fullScreenModal" : "card",
				headerLeft: () =>
					Platform.OS === "ios" ? (
						<Link
							href=".."
							hitSlop={{ top: 6, left: 6, right: 12, bottom: 12 }}
						>
							<Title color="primary-9" fontWeight="normal">
								Cancel
							</Title>
						</Link>
					) : null,
			}}
		/>
		<Stack.Screen name="post/[id]/index" options={{ title: "Post" }} />
		<Stack.Screen
			name="post/[id]/comments"
			options={{
				title: "Comments",
				presentation: "modal",
			}}
		/>

		<Stack.Screen name="search/index" options={{ title: "Search" }} />
	</Stack>
);

export default AppLayout;
