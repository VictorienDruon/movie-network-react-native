import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/commons";
import SignOutButton from "@/features/settings/SignOutButton";
import DeleteAccountButton from "@/features/settings/DeleteAccountButton";
import { Box, VStack } from "@/components/ui";

const SettingsScreen = () => {
	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<Box p={32}>
				<VStack space={16}>
					<SignOutButton />

					<DeleteAccountButton />
				</VStack>
			</Box>
		</ErrorBoundary>
	);
};

export default SettingsScreen;
