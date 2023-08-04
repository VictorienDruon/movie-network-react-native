import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Auth from "@/features/auth";

const SignInScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Sign In</Text>
				<Auth />
			</View>
		</SafeAreaView>
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
});

export default SignInScreen;
