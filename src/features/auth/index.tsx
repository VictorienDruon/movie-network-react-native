import { useEffect } from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import GoogleButton from "./components/GoogleButton";
import TwitterButton from "./components/TwitterButton";

const Auth = () => {
	useEffect(() => {
		WebBrowser.warmUpAsync();
		return () => {
			WebBrowser.coolDownAsync();
		};
	});

	return (
		<View>
			<GoogleButton />
			<TwitterButton />
		</View>
	);
};

export default Auth;
