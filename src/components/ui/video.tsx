import { useState } from "react";
import { Dimensions } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import useFocus from "@/hooks/useFocus";
import { Box } from "./box";
import { Image } from "./image";

interface VideoProps {
	videoKey: string;
	backdropPath: string;
	posterPath: string;
}

export const Video = ({ videoKey, backdropPath, posterPath }: VideoProps) => {
	const isFocused = useFocus();
	const [isLoading, setIsLoading] = useState(true);
	const { width } = Dimensions.get("screen");
	const height = width * 0.5625;

	const handleReady = (event: PLAYER_STATES) => {
		if (event === PLAYER_STATES.PLAYING) setIsLoading(false);
	};

	return (
		<Box
			zIndex={1}
			bg="neutral-3"
			shadowColor="black"
			shadowOffset={{ width: 0, height: 10 }}
			shadowOpacity={0.2}
			shadowRadius={10}
			elevation={5}
		>
			{videoKey.length > 0 && (
				<YoutubePlayer
					videoId={videoKey}
					play={isFocused}
					height={height}
					onChangeState={handleReady}
				/>
			)}

			{isLoading && (
				<Box
					position={videoKey ? "absolute" : "relative"}
					width="100%"
					height={height}
					bg="neutral-3"
				>
					{backdropPath ? (
						<Image
							src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
							alt="Backdrop image"
							width="100%"
							height={height}
						/>
					) : (
						<Image
							src={`https://image.tmdb.org/t/p/w500${posterPath}`}
							alt="Backdrop image"
							contentFit="contain"
							height={height}
						/>
					)}
				</Box>
			)}
		</Box>
	);
};
