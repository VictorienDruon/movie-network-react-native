import { Box } from "./box";

export const Separator = () => {
	return (
		<Box height={1} justifyContent="center">
			<Box borderTopWidth={0.25} borderColor="neutral-6"></Box>
		</Box>
	);
};
