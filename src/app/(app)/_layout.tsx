import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppLayout = () => (
	<QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="profile/[id]/(tabs)" options={{ title: "Profile" }} />
			<Stack.Screen
				name="profile/[id]/following"
				options={{ title: "Following", presentation: "modal" }}
			/>
			<Stack.Screen
				name="profile/[id]/followers"
				options={{ title: "Followers", presentation: "modal" }}
			/>
			<Stack.Screen name="post/[id]/index" options={{ title: "Post" }} />
			<Stack.Screen
				name="post/[id]/comments"
				options={{
					title: "Comments",
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="post/create/index"
				options={{ title: "Create Post" }}
			/>
			<Stack.Screen
				name="post/create/movies"
				options={{ title: "Select a Movie", presentation: "modal" }}
			/>
			<Stack.Screen
				name="post/create/shows"
				options={{ title: "Select a TV show", presentation: "modal" }}
			/>
		</Stack>
	</QueryClientProvider>
);

export default AppLayout;
