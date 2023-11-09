import { router } from "expo-router";
import { Alert } from "react-native";

export const createSignInAlert = () =>
	Alert.alert(
		"You need to be signed in to do that.",
		"Sign in to access all Movie Network features.",
		[
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Sign in now!",
				onPress: () => router.push("/"),
			},
		]
	);
