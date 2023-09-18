import { Stack } from "expo-router";
import { RegionsProvider } from "@/providers/regions";

const DetailsLayout = () => (
	<RegionsProvider>
		<Stack>
			<Stack.Screen
				name="regions"
				options={{ title: "Available Regions", presentation: "modal" }}
			/>
		</Stack>
	</RegionsProvider>
);

export default DetailsLayout;
