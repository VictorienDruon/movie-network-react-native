import { TouchableOpacity } from "react-native";
import { HStack, Avatar, Title, Subtitle, Box } from "@/components/ui";
import Region from "./types/Region";

interface RegionCardProps {
	region: Region;
	isSelected: boolean;
	onPress: () => void;
}

const RegionCard = ({ region, isSelected, onPress }: RegionCardProps) => (
	<TouchableOpacity onPress={onPress}>
		<HStack
			alignItems="center"
			my={8}
			px={16}
			py={8}
			space={16}
			bg={isSelected ? "primary-5" : "neutral-5"}
			borderRadius="md"
			borderWidth={1}
			borderColor={isSelected ? "primary-6" : "neutral-6"}
		>
			<Avatar src={region.flagUrl} size={40} alt={region.name} />

			<Box flex={1} maxWidth="70%">
				<Title numberOfLines={1} ellipsizeMode="tail">
					{region.name}
				</Title>
			</Box>

			<Subtitle>{region.code}</Subtitle>
		</HStack>
	</TouchableOpacity>
);

export default RegionCard;
