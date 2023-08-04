import { FontAwesome as Icon } from "@expo/vector-icons";
import useSignIn from "../hooks/useSignIn";

const GoogleButton = () => {
	const { handleSignInPress, isLoading } = useSignIn("google");

	return (
		<Icon.Button
			name="google"
			color="white"
			backgroundColor="#5383EC"
			disabled={isLoading}
			onPress={handleSignInPress}
		>
			Sign In with Google
		</Icon.Button>
	);
};

export default GoogleButton;
