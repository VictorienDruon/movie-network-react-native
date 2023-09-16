import { Provider } from "@/features/provider";

export interface ProvidersByCategory {
	link: string;
	flatrate?: Provider[];
	buy?: Provider[];
	rent?: Provider[];
}

export interface ProvidersByRegion {
	[region: string]: ProvidersByCategory;
}
