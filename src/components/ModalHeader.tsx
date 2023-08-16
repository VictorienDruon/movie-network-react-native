import { Box, Title } from "./ui";

const ModalHeader = ({ name }: { name: string }) => {
	return (
		<Box alignItems="center">
			<Box
				width={40}
				height={5}
				mb={16}
				borderRadius={10}
				backgroundColor="neutral-6"
			/>
			<Title>{name}</Title>
		</Box>
	);
};

export default ModalHeader;
