import { Animated, Dimensions, FlatList } from "react-native";
import Svg, { Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { tmdbConfig } from "@/libs/tmdb";
import { Box, Image } from "@/components/ui";
import { WatchlistItem } from "./types/WatchlistItem";

interface BackdropProps {
	watchlist: WatchlistItem[];
	scrollX: Animated.Value;
}

const Backdrop = ({ watchlist, scrollX }: BackdropProps) => {
	const { width, height } = Dimensions.get("screen");
	const itemSize = width * 0.72;
	const backdropHeight = (width * 9) / 16;
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);

	return (
		<Box position="absolute" width={width} height={backdropHeight}>
			<FlatList
				data={watchlist}
				keyExtractor={(item) => item.id + item.type}
				renderItem={({ item, index }) => {
					if (!("title" in item)) return null;

					const inputRange = [(index - 1) * itemSize, index * itemSize];
					const translateX = scrollX.interpolate({
						inputRange,
						outputRange: [-width, 0],
					});

					const { title, backdropPath } = item;

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
				}}
			/>

			<LinearGradient
				colors={["transparent", "white"]}
				style={{
					position: "absolute",
					bottom: 0,
					width,
					height: backdropHeight,
				}}
			/>
		</Box>
	);
};

export default Backdrop;
