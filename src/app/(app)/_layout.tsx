import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function ModalHeader({ title }: { title: string }) {
	return (
		<View style={{ alignItems: "center" }}>
			<View
				style={{
					marginBottom: 15,
					width: 40,
					height: 5,
					borderRadius: 10,
					backgroundColor: "#D9D9D9",
				}}
			/>
			<Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
		</View>
	);
}

const AppLayout = () => (
	<QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="comments/[postId]"
				options={{
					title: "Comments",
					presentation: "modal",
					headerTitle: ({ children: title }) => <ModalHeader title={title} />,
				}}
			></Stack.Screen>
		</Stack>
	</QueryClientProvider>
);

export default AppLayout;
