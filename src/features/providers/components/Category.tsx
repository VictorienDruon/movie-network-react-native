import { FlatList } from "react-native";
import { Provider } from "./Provider";
import { Section } from "@/components/layouts";

interface Category {
	title: string;
	link: string;
	providers: Provider[];
}

const Category = ({ title, link, providers }: Category) => (
	<Section title={title} flatlist>
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
	</Section>
);

export default Category;
