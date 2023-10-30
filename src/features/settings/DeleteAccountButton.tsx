import { Alert } from "react-native";
import { useErrorBoundary } from "react-error-boundary";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { getSecret } from "@/libs/supabase/api/vault";
import { Button } from "@/components/ui";

const DeleteAccountButton = () => {
	const { showBoundary } = useErrorBoundary();

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

			const { error: signOutError } = await supabase.auth.signOut();

			if (signOutError) throw signOutError;
		} catch (error) {
			showBoundary(error);
		}
	};

	const createDeletionAlert = () =>
		Alert.alert(
			"Are you sure you want to delete your account?",
			"You will lose all your data. This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Confirm",
					onPress: handleDeleteAccountPress,
					style: "destructive",
				},
			]
		);

	return (
		<Button variant="outline" size="lg" onPress={createDeletionAlert}>
			Delete Account
		</Button>
	);
};

export default DeleteAccountButton;
