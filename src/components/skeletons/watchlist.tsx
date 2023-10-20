import { Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { Box, Skeleton, VStack } from "../ui";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = Math.round(width * 0.72);
const BACKDROP_HEIGHT = Math.round(height * 0.4);

export const WatchlistSkeleton = () => {
	const { colors } = useTheme<Theme>();
	return (
		<Box flex={1}>
			<Box position="absolute">
				<Box width={width} height={BACKDROP_HEIGHT} />

				<LinearGradient
					colors={[colors["neutral-4"], colors["neutral-1"]]}
					style={{
						position: "absolute",
						bottom: 0,
						width,
						height: BACKDROP_HEIGHT,
					}}
				/>
			</Box>

			<Box
				position="relative"
				top={25}
				flex={1}
				justifyContent="center"
				alignItems="center"
			>
				<Box alignItems="center" width={ITEM_SIZE}>
					<VStack
						alignItems="center"
						mx={12}
						p={12}
						space={16}
						borderRadius="xl"
						backgroundColor="neutral-1"
					>
						<Skeleton
							width={ITEM_SIZE - 48}
							aspectRatio={5 / 7}
							borderRadius="lg"
						/>

						<VStack alignItems="center" space={4}>
							<Skeleton width={128} height={18} borderRadius="lg" />

							<Skeleton width={96} height={14} borderRadius="lg" />
						</VStack>

						<VStack space={4}>
							<Skeleton width={ITEM_SIZE - 48} height={14} borderRadius="lg" />
							<Skeleton width={ITEM_SIZE - 48} height={14} borderRadius="lg" />
							<Skeleton width={96} height={14} borderRadius="lg" />
						</VStack>
					</VStack>
				</Box>
			</Box>
		</Box>
	);
};
