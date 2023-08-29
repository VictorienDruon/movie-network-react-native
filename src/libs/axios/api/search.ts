import { api } from "..";

export async function getAll(query: string, page: number) {
	const params = new URLSearchParams({ query, page: page.toString() });

	try {
		const { data } = await api.get("/search/multi", { params });

		return {
			results: data.results,
			nextCursor: data.page < data.total_pages ? data.page + 1 : undefined,
		};
	} catch (error) {
		throw error;
	}
}
