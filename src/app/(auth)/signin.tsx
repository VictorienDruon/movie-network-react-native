import Auth from "@/features/auth";
import { Box, Title } from "@/components/ui";

const SignInScreen = () => {
	return (
		<Box pt={64} px={16}>
			<Title>Sign In</Title>
			<Auth />
		</Box>
	);
};

export default SignInScreen;
