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

	return (
		<Button variant="outline" size="lg" onPress={handleDeleteAccountPress}>
			Delete Account
		</Button>
	);
};

export default DeleteAccountButton;
