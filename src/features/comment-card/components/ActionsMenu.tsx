import { Alert, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import { supabase } from "@/libs/supabase";
import { reportComment } from "@/libs/supabase/api/reports";
import { Icon } from "@/components/ui";
import { deleteComment } from "@/libs/supabase/api/comments";

interface ActionsMenuProps {
	commentId: string;
	authorId: string;
}

const ActionsMenu = ({ commentId, authorId }: ActionsMenuProps) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const queryClient = useQueryClient();
	const user = useUser();

	if (user?.id === authorId) {
		const mutation = useMutation(deleteComment, {
			onSuccess: ({ user_id, post_id }) => {
				queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
				queryClient.invalidateQueries({ queryKey: ["comments", user_id] });
			},
		});

		const createDeletingAlert = () =>
			Alert.alert(
				"Are you sure you want to delete this comment?",
				"Once deleted, the comment will be gone forever.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Delete",
						onPress: () => mutation.mutate(commentId),
						style: "destructive",
					},
				]
			);

		const openMenu = () => {
			const options = ["Delete", "Cancel"];
			const destructiveButtonIndex = 0;
			const cancelButtonIndex = 1;

			showActionSheetWithOptions(
				{
					options,
					destructiveButtonIndex,
					cancelButtonIndex,
				},
				async (selectedIndex?: number) => {
					switch (selectedIndex) {
						case destructiveButtonIndex: {
							createDeletingAlert();
							break;
						}
						case cancelButtonIndex:
						// Canceled
					}
				}
			);
		};

		return (
			<TouchableOpacity
				onPress={openMenu}
				hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
			>
				<Icon name="MoreHorizontal" size={16} color="neutral-11" />
			</TouchableOpacity>
		);
	} else {
		const mutation = useMutation(reportComment);

		const handleReportComment = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			mutation.mutate({
				reporterUserId: user.id,
				reportedCommentId: commentId,
			});
		};

		const createReportingAlert = () =>
			Alert.alert(
				"Are you sure you want to report this comment?",
				"Once reported, the comment will be reviewed by our team.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Report",
						onPress: handleReportComment,
						style: "destructive",
					},
				]
			);

		const openMenu = () => {
			const options = ["Report", "Cancel"];
			const cancelButtonIndex = 1;

			showActionSheetWithOptions(
				{
					options,
					cancelButtonIndex,
				},
				async (selectedIndex?: number) => {
					switch (selectedIndex) {
						case 0: {
							createReportingAlert();
							break;
						}
						case cancelButtonIndex:
						// Canceled
					}
				}
			);
		};

		return (
			<TouchableOpacity
				onPress={openMenu}
				hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
			>
				<Icon name="MoreHorizontal" size={16} color="neutral-11" />
			</TouchableOpacity>
		);
	}
};

export default ActionsMenu;
