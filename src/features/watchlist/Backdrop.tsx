import { Animated, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { tmdbConfig } from "@/libs/tmdb";
import { Image } from "@/components/ui";
import { WatchlistItem } from "./types/WatchlistItem";

const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = width * 0.65;
const BACKDROP_HEIGHT = (width * 9) / 16;

interface BackdropProps {
	item: WatchlistItem;
	index: number;
	scrollX: Animated.Value;
}

const Backdrop = ({ item, index, scrollX }: BackdropProps) => {
	const { title, backdropPath } = item;
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);

	if (!("title" in item)) return null;

	const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE];
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: [-width, 0],
	});

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
				height={BACKDROP_HEIGHT}
			/>
		</MaskedView>
	);
};

export default Backdrop;
