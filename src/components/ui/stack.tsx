import { Theme } from "@/styles/theme";
import { Box, BoxProps } from "./box";

export interface StackProps extends Omit<BoxProps, "flexDirection" | "gap"> {
	direction?: "row" | "column" | "row-reverse" | "column-reverse";
	reverse?: boolean;
	space: keyof Theme["spacing"];
}

export const Stack = ({ direction, space, ...props }: StackProps) => {
	return <Box flexDirection={direction} gap={space} {...props} />;
};

export const HStack = ({ reverse, ...props }: StackProps) => {
	return <Stack direction={reverse ? "row-reverse" : "row"} {...props} />;
};

export const VStack = ({ reverse, ...props }: StackProps) => {
	return <Stack direction={reverse ? "column-reverse" : "column"} {...props} />;
};
