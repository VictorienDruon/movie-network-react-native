export interface ApiResponse<T = any> {
	results: T[];
	page: number;
	total_pages: number;
}
