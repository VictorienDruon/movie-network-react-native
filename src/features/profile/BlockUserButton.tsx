import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import {
	toggleBlockUser,
	handleBlockUserSuccess,
} from "@/libs/supabase/api/blocked-users";
import { Button } from "@/components/ui";

interface BlockUserButtonProps {
	blockedUserId: string;
	isUserBlocked: boolean;
	isUserFollowing: boolean;
}

const BlockUserButton = ({
	blockedUserId,
	isUserBlocked,
	isUserFollowing,
}: BlockUserButtonProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(toggleBlockUser, {
		onSuccess: ({ blockerUserId, blockedUserId }) =>
			handleBlockUserSuccess(blockerUserId, blockedUserId, queryClient),
	});

	const handleBlockPress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		mutation.mutate({
			blockerUserId: user.id,
			blockedUserId,
			isUserBlocked,
			isUserFollowing,
		});
	};

	if (isUserBlocked) {
		const cretateUnblockingAlert = () =>
			Alert.alert(
				"Are you sure you want to unblock this user?",
				"You will see their posts again.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Confirm",
						onPress: handleBlockPress,
						style: "destructive",
					},
				]
			);

		return (
			<Button
				variant="secondaryOutline"
				size="sm"
				disabled={mutation.isLoading}
				onPress={cretateUnblockingAlert}
			>
				Unblock user
			</Button>
		);
	} else {
		const createBlockingAlert = () =>
			Alert.alert(
				"Are you sure you want to block this user?",
				"You will no longer see their posts.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Confirm",
						onPress: handleBlockPress,
						style: "destructive",
					},
				]
			);

		return (
			<Button
				variant="secondaryOutline"
				size="sm"
				disabled={mutation.isLoading}
				onPress={createBlockingAlert}
			>
				Block user
			</Button>
		);
	}
};

export default BlockUserButton;
