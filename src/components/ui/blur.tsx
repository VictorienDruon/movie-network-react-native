import { BlurView } from "expo-blur";
import { Box, BoxProps } from "./box";

interface BlurProps extends BoxProps {
	intensity?: number;
	tint?: "light" | "dark" | "default";
	children: React.ReactNode;
}

export const Blur = ({ intensity, tint, children, ...props }: BlurProps) => (
	<Box overflow="hidden" {...props}>
		<BlurView intensity={intensity} tint={tint}>
			{children}
		</BlurView>
	</Box>
);
