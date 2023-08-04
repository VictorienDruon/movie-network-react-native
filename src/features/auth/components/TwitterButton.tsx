import { FontAwesome as Icon } from "@expo/vector-icons";
import useSignIn from "../hooks/useSignIn";

const TwitterButton = () => {
	const { handleSignInPress, isLoading } = useSignIn("twitter");

	return (
		<Icon.Button
			name="twitter"
			color="white"
			backgroundColor="#4999E9"
			disabled={isLoading}
			onPress={handleSignInPress}
		>
			Sign In with Twitter
		</Icon.Button>
	);
};

export default TwitterButton;
