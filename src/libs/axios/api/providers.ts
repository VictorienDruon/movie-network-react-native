import { getLocales } from "expo-localization";
import { api } from "..";
import { Providers } from "../types/Providers";

export async function getProviders(type: "movie" | "tv", id: string) {
	const locales = getLocales();
	const regionCode = locales[0].languageCode.toUpperCase();

	try {
		const { data } = await api.get(`/${type}/${id}/watch/providers`);

		const providers: Providers =
			regionCode in data.results ? data.results[regionCode] : data.results.US;

		return providers;
	} catch (error) {
		throw error;
	}
}
