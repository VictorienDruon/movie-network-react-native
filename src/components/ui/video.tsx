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
		<Box zIndex={1}>
			{videoKey && (
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
							src={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}/w780${backdropPath}`}
							alt="Backdrop image"
							width="100%"
							height={height}
						/>
					) : (
						<Image
							src={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}/w500${posterPath}`}
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
