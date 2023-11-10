import { Alert, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import { supabase } from "@/libs/supabase";
import { deletePost, handleDeletePostSuccess } from "@/libs/supabase/api/posts";
import { reportPost } from "@/libs/supabase/api/reports";
import { Icon } from "@/components/ui";

interface ActionsMenuProps {
	postId: string;
	authorId: string;
}

const ActionsMenu = ({ postId, authorId }: ActionsMenuProps) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const queryClient = useQueryClient();
	const user = useUser();

	if (user?.id === authorId) {
		const mutation = useMutation(deletePost, {
			onSuccess: ({ user_id }) => handleDeletePostSuccess(user_id, queryClient),
		});

		const createDeletingAlert = () =>
			Alert.alert(
				"Are you sure you want to delete this post?",
				"Once deleted, the post will be gone forever.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Delete",
						onPress: () => mutation.mutate(postId),
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
		const mutation = useMutation(reportPost);

		const handleReportPost = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			mutation.mutate({
				reporterUserId: user.id,
				reportedPostId: postId,
			});
		};

		const createReportingAlert = () =>
			Alert.alert(
				"Are you sure you want to report this post?",
				"Once reported, the post will be reviewed by our team.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Report",
						onPress: handleReportPost,
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
