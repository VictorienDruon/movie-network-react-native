import { Linking } from "react-native";
import { appConfig } from "@/config/app";
import { Metadata } from "@/components/ui";

const LegalDisclaimer = () => {
	return (
		<Metadata px={16} textAlign="center">
			{"By continuing, you agree to our "}
			<Metadata
				onPress={() => Linking.openURL(appConfig.links.site + "/terms")}
			>
				Terms of Service
			</Metadata>
			{" and "}
			<Metadata
				onPress={() => Linking.openURL(appConfig.links.site + "/privacy")}
			>
				Privacy Policy
			</Metadata>
			{"."}
		</Metadata>
	);
};

export default LegalDisclaimer;
