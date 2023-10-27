import { Animated, Dimensions, Platform } from "react-native";
import Svg, { Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { tmdbConfig } from "@/libs/tmdb";
import { Image } from "@/components/ui";
import { WatchlistItem } from "./types/WatchlistItem";

const { width, height } = Dimensions.get("screen");

interface BackdropProps {
	item: WatchlistItem;
	index: number;
	scrollX: Animated.Value;
	itemSize: number;
	backdropHeight: number;
}

const Backdrop = ({
	item,
	index,
	scrollX,
	itemSize,
	backdropHeight,
}: BackdropProps) => {
	const { title, backdropPath } = item;
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);

	const inputRange = [(index - 1) * itemSize, index * itemSize];
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: [-width, 0],
	});

	if (Platform.OS === "android")
		return (
			<Animated.View
				removeClippedSubviews={false}
				style={{
					position: "absolute",
					width,
					height,
					overflow: "hidden",
					transform: [{ translateX }],
				}}
			>
				<Image
					src={`${tmdbConfig.links.image}/w1280${backdropPath}`}
					alt={title}
					width={width}
					height={backdropHeight}
				/>
			</Animated.View>
		);

	return (
		<MaskedView
			style={{ position: "absolute" }}
			maskElement={
				<AnimatedSvg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					style={{ transform: [{ translateX }] }}
				>
					<Rect x="0" y="0" width={width} height={height} fill="red" />
				</AnimatedSvg>
			}
		>
			<Image
				src={`${tmdbConfig.links.image}/w1280${backdropPath}`}
				alt={title}
				width={width}
				height={backdropHeight}
			/>
		</MaskedView>
	);
};

export default Backdrop;
