import { useRef } from "react";
import { TextInput } from "react-native";
import debounce from "lodash.debounce";
import { Box, Button, HStack, Input } from "@/components/ui";

interface SearchBarProps {
	label: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ label, setValue }: SearchBarProps) => {
	const inputRef = useRef<TextInput>(null);

	const handleTextChange = debounce((newValue: string) => {
		setValue(newValue.trim());
	}, 500);

	const handleClearPress = () => {
		inputRef.current.clear();
		setValue("");
	};

	return (
		<Box justifyContent="center" height={56} borderColor="neutral-6">
			<HStack
				flex={1}
				alignItems="center"
				maxHeight={40}
				pl={12}
				pr={8}
				space={8}
				bg="neutral-3"
				borderRadius="lg"
			>
				<Input
					ref={inputRef}
					flex={1}
					placeholder={`Search for a ${label}`}
					color="neutral-12"
					placeholderTextColor="neutral-9"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={handleTextChange}
				/>

				<Button rightIcon="X" variant="secondary" onPress={handleClearPress} />
			</HStack>
		</Box>
	);
};

export default SearchBar;
