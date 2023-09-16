import { Image } from "@/components/ui";

export interface Provider {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export const Provider = ({ provider }: { provider: Provider }) => (
	<Image
		src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
		alt={provider.provider_name}
		width={70}
		height={70}
		marginHorizontal={8}
		borderRadius="lg"
		borderWidth={1}
		borderColor="neutral-6"
	/>
);
