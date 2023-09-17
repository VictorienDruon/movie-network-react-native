import { FlatList } from "react-native";
import { VStack, Title } from "@/components/ui";
import { Person } from "./components/Person";

interface PersonsProps {
	title: string;
	persons: Person[];
}

const Persons = ({ title, persons }: PersonsProps) => (
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

export default Persons;
