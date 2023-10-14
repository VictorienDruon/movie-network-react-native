export function convertKeysToCamelCase<T>(obj: Record<string, any>): T {
	if (typeof obj !== "object") {
		throw new Error("Input is not an object");
	}

	const camelCaseObject: Record<string, any> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const camelKey = key.replace(/_([a-z])/g, (_, char) =>
				char.toUpperCase()
			);
			camelCaseObject[camelKey] = obj[key];
		}
	}

	return camelCaseObject as T;
}

export function convertKeysToSnakeCase<T>(obj: Record<string, any>): T {
	if (typeof obj !== "object") {
		throw new Error("Input is not an object");
	}

	const snakeCaseObject: Record<string, any> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const snakeKey = key.replace(
				/([A-Z])/g,
				(_, char) => `_${char.toLowerCase()}`
			);
			snakeCaseObject[snakeKey] = obj[key];
		}
	}

	return snakeCaseObject as T;
}
