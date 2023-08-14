import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { Box } from "@/components/ui";
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
		<Box>
			<GoogleButton />
			<TwitterButton />
		</Box>
	);
};

export default Auth;
