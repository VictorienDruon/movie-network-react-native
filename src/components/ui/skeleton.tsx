import { useState, useEffect } from "react";
import { Animated } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { Box, BoxProps } from "./box";

export const Skeleton = (props: BoxProps) => {
	const [pulse] = useState(new Animated.Value(0));
	const { colors } = useTheme<Theme>();

	useEffect(() => {
		const pulseAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(pulse, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(pulse, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
			]),
			{ iterations: -1 }
		);
		pulseAnimation.start();

		return () => {
			pulseAnimation.stop();
		};
	}, [pulse]);

	const color = pulse.interpolate({
		inputRange: [0, 1],
		outputRange: [colors["neutral-3"], colors["neutral-2"]],
	});

	return (
		<Box overflow="hidden" {...props}>
			<Animated.View style={{ flex: 1, backgroundColor: color }} />
		</Box>
	);
};

export default Skeleton;
