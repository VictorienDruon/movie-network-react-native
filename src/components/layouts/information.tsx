import { Body, Box, Metadata, VStack } from "../ui";

interface InformationProps {
	title: string;
	content: string;
}

export const Information = ({ title, content }: InformationProps) => (
	<VStack space={2}>
		<Body>{title}</Body>
		<Metadata fontSize={12}>{content}</Metadata>
	</VStack>
);
