import { Box } from "./box";

export const Separator = () => {
	return (
		<Box width="100%" height={1} justifyContent="center">
			<Box borderTopWidth={0.5} borderColor="neutral-6"></Box>
		</Box>
	);
};
