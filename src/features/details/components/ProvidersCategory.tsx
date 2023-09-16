import { Provider } from "@/features/provider";
import { VStack, Title } from "@/components/ui";
import { FlatList } from "react-native";

interface ProvidersProps {
	category: string;
	providers: Provider[];
}

const ProvidersCategory = ({ category, providers }: ProvidersProps) => (
	<VStack space={8}>
		<Title pl={16}>{category}</Title>
		<FlatList
			data={providers}
			keyExtractor={(p) => p.provider_id.toString()}
			renderItem={({ item: provider }) => <Provider provider={provider} />}
			contentContainerStyle={{ paddingHorizontal: 8 }}
			showsHorizontalScrollIndicator={false}
			horizontal
		/>
	</VStack>
);

export default ProvidersCategory;
