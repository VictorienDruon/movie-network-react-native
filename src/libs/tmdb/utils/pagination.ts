const MAX_PAGES = 10;

export function getNextCursor(page: number, totalPages: number) {
	return page < totalPages && page < MAX_PAGES ? page + 1 : undefined;
}
