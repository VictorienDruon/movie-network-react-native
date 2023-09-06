export interface Provider {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export interface Providers {
	link: string;
	flatrate?: Provider[];
	buy?: Provider[];
	rent?: Provider[];
}
