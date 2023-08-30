import { Stack } from "expo-router";
import { PostCreationProvider } from "@/providers/post-creation";

const CreateLayout = () => (
	<PostCreationProvider>
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="movies"
				options={{ title: "Select a Movie", presentation: "modal" }}
			/>
			<Stack.Screen
				name="shows"
				options={{ title: "Select a TV show", presentation: "modal" }}
			/>
		</Stack>
	</PostCreationProvider>
);

export default CreateLayout;
