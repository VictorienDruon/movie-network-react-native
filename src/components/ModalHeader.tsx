import { Box, VStack, Title } from "./ui";

const ModalHeader = ({ name }: { name: string }) => {
	return (
		<VStack space={16} alignItems="center">
			<Box
				width={40}
				height={5}
				borderRadius="md"
				backgroundColor="neutral-6"
			/>
			<Title>{name}</Title>
		</VStack>
	);
};

export default ModalHeader;
