import { Stack } from "expo-router";
import { PostersProvider } from "@/providers/posters";

const CreateLayout = () => (
	<PostersProvider>
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="posters-picker/[type]"
				options={{ presentation: "modal" }}
			/>
		</Stack>
	</PostersProvider>
);

export default CreateLayout;
