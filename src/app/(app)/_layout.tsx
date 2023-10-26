import { Platform } from "react-native";
import { Link, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Title } from "@/components/ui";

const queryClient = new QueryClient();

const AppLayout = () => (
	<QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="(drawer)" options={{ headerShown: false }} />

			<Stack.Screen name="profile/[id]/(tabs)" options={{ title: "Profile" }} />
			<Stack.Screen
				name="profile/[id]/following"
				options={{ title: "Following", presentation: "modal" }}
			/>
			<Stack.Screen
				name="profile/[id]/followers"
				options={{ title: "Followers", presentation: "modal" }}
			/>
			<Stack.Screen name="profile/settings" options={{ title: "Settings" }} />

			<Stack.Screen
				name="post/create"
				options={{
					title: "Create a Post",
					presentation: Platform.OS === "ios" ? "fullScreenModal" : "card",
					headerLeft: () =>
						Platform.OS === "ios" ? (
							<Link href="..">
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
	</QueryClientProvider>
);

export default AppLayout;
