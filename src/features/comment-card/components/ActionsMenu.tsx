import { Alert, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { reportComment } from "@/libs/supabase/api/reports";
import { Icon } from "@/components/ui";

const ActionsMenu = ({ commentId }: { commentId: string }) => {
	const { showActionSheetWithOptions } = useActionSheet();

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
};

export default ActionsMenu;
