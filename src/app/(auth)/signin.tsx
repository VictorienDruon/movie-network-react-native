import Auth from "@/features/auth";
import { Layout, Text } from "@/components/ui";

const SignInScreen = () => {
	return (
		<Layout>
			<Text variant="title">Sign In</Text>
			<Auth />
		</Layout>
	);
};

export default SignInScreen;
