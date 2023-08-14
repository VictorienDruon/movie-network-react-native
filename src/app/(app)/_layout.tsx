import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/themes";
import { Box, Text } from "@/components/ui";

const queryClient = new QueryClient();

function ModalHeader({ title }: { title: string }) {
	return (
		<Box alignItems="center" backgroundColor="mainBackground">
			<Box
				width={40}
				height={5}
				mb="md"
				borderRadius={10}
				backgroundColor="gray6"
			/>
			<Text variant="title">{title}</Text>
		</Box>
	);
}

const AppLayout = () => {
	const { colors } = useTheme<Theme>();

	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="comments/[postId]"
					options={{
						title: "Comments",
						presentation: "modal",
						headerTitle: ({ children: title }) => <ModalHeader title={title} />,
						headerStyle: { backgroundColor: colors.mainBackground },
					}}
				></Stack.Screen>
			</Stack>
		</QueryClientProvider>
	);
};

export default AppLayout;
