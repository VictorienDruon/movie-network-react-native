import { Body, Box, Metadata } from "../../../components/ui";

interface InformationProps {
	title: string;
	content: string;
}

const Information = ({ title, content }: InformationProps) => (
	<Box>
		<Body fontSize={13}>{title}</Body>
		<Metadata>{content}</Metadata>
	</Box>
);
export default Information;
