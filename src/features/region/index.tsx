import { TouchableOpacity } from "react-native";
import { HStack, Avatar, Title, Subtitle, Box } from "@/components/ui";

export interface Region {
	name: string;
	code: string;
	flag: string;
}

interface RegionProps {
	region: Region;
	isSelected: boolean;
	onPress: () => void;
}

export const Region = ({ region, isSelected, onPress }: RegionProps) => (
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
			<Avatar src={region.flag} size={40} alt={region.name} />

			<Box flex={1} maxWidth="70%">
				<Title numberOfLines={1} ellipsizeMode="tail">
					{region.name}
				</Title>
			</Box>

			<Subtitle>{region.code}</Subtitle>
		</HStack>
	</TouchableOpacity>
);
