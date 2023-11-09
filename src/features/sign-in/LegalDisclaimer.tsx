import { appConfig } from "@/config/app";
import { onOpenExternalLink } from "@/utils/linking";
import { Metadata } from "@/components/ui";

const LegalDisclaimer = () => {
	return (
		<Metadata px={16} textAlign="center">
			{"By continuing, you agree to our "}
			<Metadata
				onPress={() =>
					onOpenExternalLink(appConfig.links.site + "/terms", true)
				}
			>
				Terms of Service
			</Metadata>
			{" and "}
			<Metadata
				onPress={() =>
					onOpenExternalLink(appConfig.links.site + "/privacy", true)
				}
			>
				Privacy Policy
			</Metadata>
			{"."}
		</Metadata>
	);
};

export default LegalDisclaimer;
