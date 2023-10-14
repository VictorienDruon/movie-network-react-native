import { TouchableOpacity } from "react-native";
import { openURL } from "expo-linking";
import { tmdbConfig } from "@/libs/tmdb";
import { Image } from "@/components/ui";
import Provider from "./types/Provider";

interface ProviderIconProps {
	link: string;
	provider: Provider;
}

const ProviderIcon = ({ link, provider }: ProviderIconProps) => (
	<TouchableOpacity onPress={() => openURL(link)}>
		<Image
			src={`${tmdbConfig.links.image}/w500${provider.logo_path}`}
			alt={provider.provider_name}
			width={64}
			height={64}
			marginHorizontal={8}
			borderRadius="lg"
			borderWidth={1}
			borderColor="neutral-6"
		/>
	</TouchableOpacity>
);

export default ProviderIcon;
