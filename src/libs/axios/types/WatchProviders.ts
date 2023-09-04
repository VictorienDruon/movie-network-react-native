export interface Provider {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export interface WachProvider {
	flatrate: Provider[];
	link: string;
	buy?: Provider[];
	rent?: Provider[];
}

export interface WatchProviders {
	results: {
		[key: string]: WachProvider;
	};
}
