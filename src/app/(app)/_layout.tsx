import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppLayout = () => (
	<QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="(drawer)" options={{ headerShown: false }} />

			<Stack.Screen name="profile/[id]/(tabs)" options={{ title: "" }} />
			<Stack.Screen
				name="profile/[id]/following"
				options={{ title: "Following", presentation: "modal" }}
			/>
			<Stack.Screen
				name="profile/[id]/followers"
				options={{ title: "Followers", presentation: "modal" }}
			/>

			<Stack.Screen name="post/create" options={{ title: "Create a Post" }} />
			<Stack.Screen name="post/[id]/index" options={{ title: "Post" }} />
			<Stack.Screen
				name="post/[id]/comments"
				options={{
					title: "Comments",
					presentation: "modal",
				}}
			/>

			<Stack.Screen name="details/[type]/[id]/index" options={{ title: "" }} />
			<Stack.Screen
				name="details/[type]/[id]/providers"
				options={{ title: "Where to Watch", presentation: "modal" }}
			/>
		</Stack>
	</QueryClientProvider>
);

export default AppLayout;
