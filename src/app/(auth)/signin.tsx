import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "@/providers/auth";
import type { Provider } from "@supabase/supabase-js";

const SignInScreen = () => {
	const [isLoading, setIslLoading] = useState(false);
	const redirectTo = useURL();
	const { signIn } = useAuth();

	useEffect(() => {
		WebBrowser.warmUpAsync();
		return () => {
			WebBrowser.coolDownAsync();
		};
	});

	const handleSignInPress = async (provider: Provider) => {
		try {
			setIslLoading(true);
			signIn(provider, redirectTo);
		} catch (err) {
			console.error(err);
		} finally {
			setIslLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Sign In</Text>
				<Button
					title="Sign In"
					disabled={isLoading}
					onPress={() => handleSignInPress("google")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 24,
	},
	main: {
		flex: 1,
		justifyContent: "center",
		maxWidth: 960,
		marginHorizontal: "auto",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 12,
		color: "#38434D",
	},
});

export default SignInScreen;
