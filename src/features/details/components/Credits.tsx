import { Person } from "@/features/person";
import { VStack, Title } from "@/components/ui";
import { FlatList } from "react-native";

interface CreditsProps {
	title: string;
	persons: Person[];
}

const Credits = ({ title, persons }: CreditsProps) => (
	<VStack space={8}>
		<Title pl={16}>{title}</Title>
		<FlatList
			data={persons}
			keyExtractor={(p) => p.id.toString() + p.role}
			renderItem={({ item: person }) => <Person person={person} mx={4} />}
			contentContainerStyle={{ paddingHorizontal: 12 }}
			showsHorizontalScrollIndicator={false}
			horizontal
		/>
	</VStack>
);

export default Credits;
