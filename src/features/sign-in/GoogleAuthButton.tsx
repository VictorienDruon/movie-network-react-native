import { useColorScheme } from "react-native";
import { useErrorBoundary } from "react-error-boundary";
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/libs/supabase";

const GoogleAuthButton = () => {
	const { showBoundary } = useErrorBoundary();
	const theme = useColorScheme();
	const buttonStyle = theme === "dark" ? "Light" : "Dark";

	GoogleSignin.configure({
		scopes: ["https://www.googleapis.com/auth/drive.readonly"],
		webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
	});

	const handleGoogleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();

			const userInfo = await GoogleSignin.signIn();

			console.log({ userInfo });

			if (userInfo.idToken) {
				const { data, error } = await supabase.auth.signInWithIdToken({
					provider: "google",
					token: userInfo.idToken,
				});

				console.log({ data, error });

				if (error) throw error;
			} else {
				throw new Error("No identity token.");
			}
		} catch (error: any) {
			if (
				error.code !== statusCodes.SIGN_IN_CANCELLED &&
				error.code !== statusCodes.IN_PROGRESS
			) {
				showBoundary(error);
			}
		}
	};

	return (
		<GoogleSigninButton
			size={GoogleSigninButton.Size.Wide}
			color={GoogleSigninButton.Color[buttonStyle]}
			onPress={handleGoogleSignIn}
		/>
	);
};

export default GoogleAuthButton;
