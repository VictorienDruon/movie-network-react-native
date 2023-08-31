import { Stack } from "expo-router";
import { PostersProvider } from "@/providers/posters";

const CreateLayout = () => (
	<PostersProvider>
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
	</PostersProvider>
);

export default CreateLayout;
