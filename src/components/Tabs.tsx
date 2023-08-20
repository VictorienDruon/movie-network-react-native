import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { capitalizeFirstLetter } from "@/utils/text";
import { Box, Subtitle, VStack } from "@/components/ui";

type Measurements = {
	x: number;
	width: number;
};

interface TabsProps {
	tabs: { label: string }[];
	contentRef: React.RefObject<Animated.FlatList>;
	scrollX: Animated.Value;
}

const Tabs = ({ tabs, contentRef, scrollX }: TabsProps) => {
	const [measures, setMeasures] = useState<Measurements[]>([]);
	const tabRefs = tabs.map(() => useRef<TouchableOpacity>(null));
	const tabsContainerRef = useRef<View>(null);

	const { width } = Dimensions.get("screen");
	const inputRange = tabs.map((_, index) => index * width);
	const indicatorWidth =
		measures.length > 0
			? scrollX.interpolate({
					inputRange,
					outputRange: measures.map((m) => m.width),
			  })
			: 0;
	const translateX =
		measures.length > 0
			? scrollX.interpolate({
					inputRange,
					outputRange: measures.map((m) => m.x),
			  })
			: 0;

	const handleTabPress = useCallback((index: number) => {
		contentRef.current?.scrollToOffset({
			offset: index * width,
		});
	}, []);

	useEffect(() => {
		const m = Array<Measurements>();
		if (tabsContainerRef.current) {
			tabRefs.forEach((tabRef) => {
				tabRef.current.measureLayout(
					tabsContainerRef.current,
					(x, y, width) => {
						m.push({ x, width });
						if (m.length === tabRefs.length) {
							setMeasures(m);
						}
					}
				);
			});
		}
	}, [tabsContainerRef.current]);

	return (
		<VStack space={4} width="100%">
			<Box
				ref={tabsContainerRef}
				flexDirection="row"
				justifyContent="space-around"
			>
				{tabs.map((tab, index) => (
					<TouchableOpacity
						key={tab.label}
						ref={tabRefs[index]}
						onPress={() => handleTabPress(index)}
					>
						<Subtitle>{capitalizeFirstLetter(tab.label)}</Subtitle>
					</TouchableOpacity>
				))}
			</Box>

			<Animated.View
				style={{
					height: 3,
					width: indicatorWidth,
					transform: [{ translateX }],
					borderRadius: 999,
				}}
			>
				<Box flex={1} bg="primary-9" />
			</Animated.View>
		</VStack>
	);
};

export default Tabs;
