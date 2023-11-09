import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

export const onOpenExternalLink = async (url: string, inBrowser: boolean) => {
	if (inBrowser) {
		await WebBrowser.openBrowserAsync(url);
	} else {
		Linking.openURL(url);
	}
};
