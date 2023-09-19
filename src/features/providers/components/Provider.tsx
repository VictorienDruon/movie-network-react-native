import { TouchableOpacity } from "react-native";
import { openURL } from "expo-linking";
import { Image } from "@/components/ui";

export interface Provider {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

interface ProviderProps {
	link: string;
	provider: Provider;
}

export const Provider = ({ link, provider }: ProviderProps) => (
	<TouchableOpacity onPress={() => openURL(link)}>
		<Image
			src={`${process.env.EXPO_PUBLIC_IMAGE_URL}/w500${provider.logo_path}`}
			alt={provider.provider_name}
			width={70}
			height={70}
			marginHorizontal={8}
			borderRadius="lg"
			borderWidth={1}
			borderColor="neutral-6"
		/>
	</TouchableOpacity>
);
