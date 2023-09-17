import { FlatList } from "react-native";
import { VStack, Title } from "@/components/ui";
import { Provider } from "./Provider";

interface Category {
	title: string;
	link: string;
	providers: Provider[];
}

const Category = ({ title, link, providers }: Category) => (
	<VStack space={8}>
		<Title pl={16}>{title}</Title>
		<FlatList
			data={providers}
			keyExtractor={(p) => p.provider_id.toString()}
			renderItem={({ item: provider }) => (
				<Provider link={link} provider={provider} />
			)}
			contentContainerStyle={{ paddingHorizontal: 8 }}
			showsHorizontalScrollIndicator={false}
			horizontal
		/>
	</VStack>
);

export default Category;
