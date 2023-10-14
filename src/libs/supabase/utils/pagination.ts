const PAGE_SIZE = 20;

export function getRange(page: number) {
	const from = page * PAGE_SIZE;
	const to = from + PAGE_SIZE;

	return { from, to };
}

export function getPage<T>(results: T[], page: number) {
	const slicedResults = results.slice(0, PAGE_SIZE);
	const nextResult = results.slice(PAGE_SIZE);

	const nextCursor = nextResult.length ? page + 1 : undefined;

	return { results: slicedResults, nextCursor };
}
