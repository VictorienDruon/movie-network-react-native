import { FlatList, TouchableOpacity } from "react-native";
import { useRegions } from "@/providers/regions";
import { Box, HStack, Heading, Subtitle, Title } from "@/components/ui";

const RegionsModal = () => {
	const { availableRegions, selectedRegion, changeRegion } = useRegions();
	return (
		<FlatList
			data={availableRegions}
			keyExtractor={(r) => r.code}
			renderItem={({ item: region }) => (
				<TouchableOpacity onPress={() => changeRegion(region)}>
					<HStack
						alignItems="center"
						my={8}
						px={16}
						py={4}
						space={16}
						bg={selectedRegion.code === region.code ? "primary-3" : "neutral-3"}
						borderWidth={1}
						borderRadius="md"
						borderColor={
							selectedRegion.code === region.code ? "primary-6" : "neutral-6"
						}
					>
						<Heading fontSize={32} lineHeight={40}>
							{region.flag}
						</Heading>

						<Box flex={1}>
							<Title numberOfLines={1} ellipsizeMode="tail">
								{region.name}
							</Title>
						</Box>

						<Subtitle>{region.code}</Subtitle>
					</HStack>
				</TouchableOpacity>
			)}
			contentContainerStyle={{
				paddingTop: 8,
				paddingBottom: 56,
				paddingHorizontal: 16,
			}}
		/>
	);
};

export default RegionsModal;
