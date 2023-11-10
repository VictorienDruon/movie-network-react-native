import { Alert, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMutation } from "@tanstack/react-query";
import { reportPost } from "@/libs/supabase/api/reports";
import { Icon } from "@/components/ui";
import { supabase } from "@/libs/supabase";

const ActionsMenu = ({ postId }: { postId: string }) => {
	const { showActionSheetWithOptions } = useActionSheet();

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
};

export default ActionsMenu;
