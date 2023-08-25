import { Box } from "./box";
import { Subtitle } from "./texts";

export const Empty = ({ children }: { children: React.ReactNode }) => (
	<Box alignItems="center" px={16} py={64}>
		<Subtitle textAlign="center">{children}</Subtitle>
	</Box>
);
