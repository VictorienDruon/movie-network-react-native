import Auth from "@/features/auth";
import { Box, Text } from "@/components/ui";

const SignInScreen = () => {
	return (
		<Box pt={64} px={16}>
			<Text variant="title">Sign In</Text>
			<Auth />
		</Box>
	);
};

export default SignInScreen;
