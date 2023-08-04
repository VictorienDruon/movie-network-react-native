import { Stack } from "expo-router";
import { SessionProvider } from "@/providers/session";

const RootLayout = () => (
	<SessionProvider>
		<Stack screenOptions={{ headerShown: false }} />
	</SessionProvider>
);

export default RootLayout;
