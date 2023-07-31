import { Slot } from "expo-router";
import { AuthProvider } from "@/providers/auth";

const RootLayout = () => (
	<AuthProvider>
		<Slot />
	</AuthProvider>
);

export default RootLayout;
