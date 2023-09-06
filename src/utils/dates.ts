import dateFormat from "dateformat";
import { ms } from "./time";

function isSameDay(date1: Date, date2: Date) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

function getDatesDiff(date1: Date, date2: Date) {
	return date1.getTime() - date2.getTime();
}

function getAgo(diff: number) {
	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(minutes / 60);

	if (minutes < 1) return "Just now";
	else if (hours < 1) return `${minutes}m ago`;
	else return `${hours}h ago`;
}

function getDay(date: Date) {
	return dateFormat(date, "dddd");
}

function getDate(date: Date) {
	return dateFormat(date, "mmm d");
}

export function getDateWithYear(date: Date) {
	return dateFormat(date, "mmm d yyyy");
}

export function getRelativeDate(dateString: string) {
	const now = new Date();
	const date = new Date(dateString);
	let diff = getDatesDiff(now, date);
	if (isSameDay(now, date)) {
		return getAgo(diff);
	} else {
		now.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);
		diff = getDatesDiff(now, date);
		if (diff <= ms.days(1)) return "Yesterday";
		else if (diff <= ms.weeks(1)) return getDay(date);
		else if (diff <= ms.years(1)) return getDate(date);
		else return getDateWithYear(date);
	}
}
