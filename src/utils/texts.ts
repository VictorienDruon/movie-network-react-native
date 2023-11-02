export function pluralize(count: number, word: string) {
	return `${word}${count < 2 ? "" : "s"}`;
}

export function capitalizeFirstLetter(word: string) {
	if (typeof word !== "string" || word.length === 0) {
		return "";
	}
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getInitials(name: string) {
	if (!name) {
		return "";
	}

	const trimmedName = name.trim();
	const names = trimmedName.split(" ");
	const initials = names.map((n) => n[0].toUpperCase());

	return initials.slice(0, 2).join("");
}
