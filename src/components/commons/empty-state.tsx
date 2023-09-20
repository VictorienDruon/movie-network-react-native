import { Box } from "../ui/box";
import { Subtitle } from "../ui/texts";

export const EmptyState = ({ children }: { children: React.ReactNode }) => (
	<Box alignItems="center" px={16} py={64}>
		<Subtitle textAlign="center">{children}</Subtitle>
	</Box>
);
