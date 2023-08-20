export function pluralize(count: number, word: string) {
	return `${word}${count === 1 ? "" : "s"}`;
}

export function capitalizeFirstLetter(word: string) {
	if (typeof word !== "string" || word.length === 0) {
		return "";
	}
	return word.charAt(0).toUpperCase() + word.slice(1);
}
