import { Theme } from "@/styles/theme";
import { Box, BoxProps } from "./box";

export interface StackProps extends Omit<BoxProps, "flexDirection" | "gap"> {
	direction?: "row" | "column";
	space: keyof Theme["spacing"];
}

export const Stack = ({ direction, space, ...props }: StackProps) => {
	return <Box flexDirection={direction} gap={space} {...props} />;
};

export const HStack = (props: StackProps) => {
	return <Stack direction="row" {...props} />;
};

export const VStack = (props: StackProps) => {
	return <Stack direction="column" {...props} />;
};
