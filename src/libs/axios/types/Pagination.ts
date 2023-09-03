export interface Pagination<T = any> {
	results: T[];
	page: number;
	total_pages: number;
}
