import { useState } from "react";
import { Dimensions } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { Video as TVideo } from "@/libs/axios/types/Video";
import { Skeleton, Image, Box } from "@/components/ui";

interface VideoProps {
	video: TVideo;
	backdropPath: string;
}

const Video = ({ video, backdropPath }: VideoProps) => {
	const [isVideoLoading, setIsVideoLoading] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const { width } = Dimensions.get("screen");
	const height = width * 0.5625;

	const handleReady = (event: PLAYER_STATES) => {
		if (event === PLAYER_STATES.PLAYING) setIsVideoLoading(false);
	};

	if (!video && !backdropPath) return <Box height={height} bg="neutral-5" />;

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

			{isVideoLoading && backdropPath.length > 0 && (
				<Box
					position={video ? "absolute" : "relative"}
					width="100%"
					height={height}
				>
					<Image
						src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
						alt="Backdrop image"
						flex={1}
						onLoadEnd={() => setIsImageLoading(false)}
					/>
				</Box>
			)}

			{isVideoLoading && isImageLoading && (
				<Skeleton
					position="absolute"
					width="100%"
					height={height}
					borderRadius="none"
				/>
			)}
		</>
	);
};

export default Video;
