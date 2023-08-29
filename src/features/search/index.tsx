import { useState } from "react";
import { Image } from "expo-image";
import { Box, Metadata, Skeleton, VStack } from "@/components/ui";

interface CardProps {
	title: string;
	posterPath: string;
	margin: number;
}

const Card = ({ title, posterPath, margin }: CardProps) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<VStack alignItems="center" width={100} space={2} style={{ margin }}>
			<Box
				position="relative"
				overflow="hidden"
				borderRadius="sm"
				borderWidth={1}
				borderColor="neutral-3"
			>
				<Image
					style={{ width: 100, height: 150 }}
					source={`http://image.tmdb.org/t/p/w154${posterPath}`}
					onLoadEnd={() => setIsLoading(false)}
				/>
				{isLoading && (
					<Skeleton
						position="absolute"
						width={100}
						height={150}
						borderRadius="none"
					/>
				)}
			</Box>
			<Metadata textAlign="center" numberOfLines={1} ellipsizeMode="tail">
				{title}
			</Metadata>
		</VStack>
	);
};

export default Card;
