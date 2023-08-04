export function pluralize(count: number, word: string) {
	return `${word}${count === 1 ? "" : "s"}`;
}
