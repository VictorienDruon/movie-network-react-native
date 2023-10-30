import { useErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui";
import { supabase } from "@/libs/supabase";

const SignOutButton = () => {
	const { showBoundary } = useErrorBoundary();

	const handleSignOutPress = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw error;
		} catch (error) {
			showBoundary(error);
		}
	};

	return (
		<Button variant="secondaryOutline" size="lg" onPress={handleSignOutPress}>
			Sign Out
		</Button>
	);
};

export default SignOutButton;
