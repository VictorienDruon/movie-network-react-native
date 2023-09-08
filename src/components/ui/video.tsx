import { useState } from "react";
import { Dimensions } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { Video as TVideo } from "@/libs/axios/types/Video";
import { Image, Box, Skeleton } from "@/components/ui";

interface VideoProps {
	video: TVideo;
	backdropPath: string;
	posterPath: string;
}

const Video = ({ video, backdropPath, posterPath }: VideoProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const { width } = Dimensions.get("screen");
	const height = width * 0.5625;

	const handleReady = (event: PLAYER_STATES) => {
		if (event === PLAYER_STATES.PLAYING) setIsLoading(false);
	};

	return (
		<>
			{video && (
				<YoutubePlayer
					videoId={video.key}
					play={true}
					height={height}
					onChangeState={handleReady}
				/>
			)}

			{isLoading && (
				<Box
					position={video ? "absolute" : "relative"}
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
							src={`https://image.tmdb.org/t/p/w342${posterPath}`}
							alt="Backdrop image"
							contentFit="contain"
							height={height}
						/>
					)}
				</Box>
			)}
		</>
	);
};

export default Video;
