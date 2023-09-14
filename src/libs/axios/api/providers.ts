import { api } from "..";
import { LocaleProviders } from "../types/Providers";

export async function getProviders(type: "movie" | "tv", id: string) {
	try {
		const { data } = await api.get(`/${type}/${id}/watch/providers`);

		const providers: LocaleProviders = data.results;

		return providers;
	} catch (error) {
		throw error;
	}
}
