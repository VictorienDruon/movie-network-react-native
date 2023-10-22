import { supabase } from "@/libs/supabase";
import { Box, Button, VStack } from "@/components/ui";

const SettingsScreen = () => {
	return (
		<Box flex={1} justifyContent="center" alignItems="center">
			<VStack space={16}>
				<Button
					variant="secondaryOutline"
					size="lg"
					onPress={() => supabase.auth.signOut()}
				>
					Sign Out
				</Button>

				<Button variant="outline" size="lg" onPress={() => {}}>
					Delete Account
				</Button>
			</VStack>
		</Box>
	);
};

export default SettingsScreen;
