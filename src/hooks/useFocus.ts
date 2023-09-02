import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

const useFocus = () => {
	const [isFocused, setIsFocused] = useState(false);

	useFocusEffect(
		useCallback(() => {
			setIsFocused(true);

			return () => {
				setIsFocused(false);
			};
		}, [])
	);

	return isFocused;
};

export default useFocus;
