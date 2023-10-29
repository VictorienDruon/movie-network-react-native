import { supabase } from "@/libs/supabase";
import { Box, Button, VStack } from "@/components/ui";
import { createClient } from "@supabase/supabase-js";
import { getSecret } from "@/libs/supabase/api/vault";

const SettingsScreen = () => {
	const handleDeleteAccountPress = async () => {
		try {
			const { data: serviceRole, error: secretError } = await getSecret(
				"service_role"
			);

			if (secretError) throw secretError;

			const supabaseAdmin = createClient(
				process.env.EXPO_PUBLIC_SUPABASE_URL,
				serviceRole,
				{
					auth: {
						autoRefreshToken: false,
						persistSession: false,
					},
				}
			);

			const {
				data: { session },
			} = await supabase.auth.getSession();

			const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
				session.user.id
			);

			if (deleteError) throw deleteError;

			await supabase.auth.signOut();
		} catch (error) {
			console.error(error);
		}
	};

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

				<Button variant="outline" size="lg" onPress={handleDeleteAccountPress}>
					Delete Account
				</Button>
			</VStack>
		</Box>
	);
};

export default SettingsScreen;
