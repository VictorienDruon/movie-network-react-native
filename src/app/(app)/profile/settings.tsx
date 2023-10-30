import { ErrorBoundary } from "react-error-boundary";
import { ErrorState } from "@/components/commons";
import SignOutButton from "@/features/settings/SignOutButton";
import DeleteAccountButton from "@/features/settings/DeleteAccountButton";
import { Box, VStack } from "@/components/ui";

const SettingsScreen = () => {
	return (
		<ErrorBoundary fallback={<ErrorState />}>
			<Box flex={1} justifyContent="center" alignItems="center">
				<VStack space={16}>
					<SignOutButton />

					<DeleteAccountButton />
				</VStack>
			</Box>
		</ErrorBoundary>
	);
};

export default SettingsScreen;
