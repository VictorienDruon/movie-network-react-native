import { useColorScheme } from "react-native";
import { useErrorBoundary } from "react-error-boundary";
import * as AppleAuthentication from "expo-apple-authentication";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { supabase } from "@/libs/supabase";

const AppleAuthButton = () => {
	const { showBoundary } = useErrorBoundary();
	const theme = useColorScheme();
	const buttonStyle = theme === "dark" ? "WHITE" : "BLACK";
	const { borderRadii } = useTheme<Theme>();

	const handleAppleSignIn = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (credential.identityToken) {
				const {
					data: { user },
					error: authError,
				} = await supabase.auth.signInWithIdToken({
					provider: "apple",
					token: credential.identityToken,
				});

				if (authError) throw authError;

				const { givenName, familyName } = credential.fullName;
				const name = `${givenName ?? ""} ${familyName ?? ""}`.trim();

				if (name) {
					const { error: profileError } = await supabase
						.from("profiles")
						.upsert({ id: user.id, name });

					if (profileError) throw profileError;
				}
			} else {
				throw new Error("No identity token.");
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
			onPress={handleAppleSignIn}
		/>
	);
};

export default AppleAuthButton;
