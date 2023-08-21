import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppLayout = () => (
	<QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
			<Stack.Screen name="post/create" options={{ title: "Create Post" }} />
			<Stack.Screen name="post/[id]" options={{ title: "Post" }} />
			<Stack.Screen
				name="comments/[postId]"
				options={{
					title: "Comments",
					presentation: "modal",
				}}
			/>
		</Stack>
	</QueryClientProvider>
);

export default AppLayout;
