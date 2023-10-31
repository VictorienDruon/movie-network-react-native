import { useColorScheme } from "react-native";
import { useErrorBoundary } from "react-error-boundary";
import * as AppleAuthentication from "expo-apple-authentication";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { supabase } from "@/libs/supabase";

const AppleAuthButton = () => {
	const { showBoundary } = useErrorBoundary();
	const colorScheme = useColorScheme();
	const buttonStyle = colorScheme === "dark" ? "WHITE" : "BLACK";
	const { borderRadii } = useTheme<Theme>();

	const handleAppleSignInPress = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			console.log(credential.email);

			if (credential.identityToken) {
				const { error } = await supabase.auth.signInWithIdToken({
					provider: "apple",
					token: credential.identityToken,
				});

				if (error) throw error;
			} else {
				throw new Error("No identity token returned from Apple");
			}
		} catch (error) {
			if (error.code !== "ERR_REQUEST_CANCELED") {
				showBoundary(error);
			}
		}
	};

	return (
		<AppleAuthentication.AppleAuthenticationButton
			buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
			buttonStyle={
				AppleAuthentication.AppleAuthenticationButtonStyle[buttonStyle]
			}
			cornerRadius={borderRadii.xl}
			style={{ width: "100%", height: 48 }}
			onPress={handleAppleSignInPress}
		/>
	);
};

export default AppleAuthButton;
