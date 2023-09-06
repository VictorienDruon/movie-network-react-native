import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Icon, Metadata, Skeleton, VStack, Image } from "@/components/ui";

interface SearchPosterProps {
	title: string;
	posterPath: string;
	isSelected: boolean;
	margin: number;
	onPress: () => void;
}

const SearchPoster = ({
	title,
	posterPath,
	isSelected,
	margin,
	onPress,
}: SearchPosterProps) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<VStack alignItems="center" width={100} space={2} style={{ margin }}>
			<TouchableOpacity onPress={onPress}>
				<Box
					position="relative"
					overflow="hidden"
					borderRadius="sm"
					borderWidth={1}
					borderColor="neutral-3"
				>
					{posterPath ? (
						<Image
							src={`https://image.tmdb.org/t/p/w185${posterPath}`}
							alt={title}
							width={100}
							height={150}
							onLoadEnd={() => setIsLoading(false)}
						/>
					) : (
						<Box
							justifyContent="center"
							alignItems="center"
							width={100}
							height={150}
							bg="neutral-5"
						>
							<Icon name="HelpCircle" size={28} color="neutral-9" />
						</Box>
					)}
					{isSelected && (
						<>
							<Box
								position="absolute"
								width={100}
								height={150}
								backgroundColor="primary-5"
								opacity={0.6}
							/>
							<Box
								position="absolute"
								justifyContent="center"
								alignItems="center"
								width={100}
								height={150}
							>
								<Box
									justifyContent="center"
									alignItems="center"
									width={28}
									height={28}
									bg="primary-9"
									borderRadius="full"
									borderWidth={1}
									borderColor="white"
								>
									<Icon name="Check" size={20} color="white" />
								</Box>
							</Box>
						</>
					)}
					{posterPath && isLoading && (
						<Skeleton
							position="absolute"
							width={100}
							height={150}
							borderRadius="none"
						/>
					)}
				</Box>
			</TouchableOpacity>

			<Metadata textAlign="center" numberOfLines={1} ellipsizeMode="tail">
				{title}
			</Metadata>
		</VStack>
	);
};

export default SearchPoster;
