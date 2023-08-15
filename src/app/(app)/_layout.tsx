import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalHeader from "@/components/ModalHeader";

const queryClient = new QueryClient();

const AppLayout = () => (
	<QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="comments/[postId]"
				options={{
					title: "Comments",
					presentation: "modal",
					headerTitle: ({ children: name }) => <ModalHeader name={name} />,
				}}
			/>
		</Stack>
	</QueryClientProvider>
);

export default AppLayout;
