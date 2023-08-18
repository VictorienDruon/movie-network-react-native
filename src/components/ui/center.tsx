import { Box, type BoxProps } from "@/components/ui";

export const Center = ({ ...props }: BoxProps) => {
	return (
		<Box
			flex={1}
			justifyContent="center"
			alignItems="center"
			{...props}
			p={32}
		/>
	);
};
