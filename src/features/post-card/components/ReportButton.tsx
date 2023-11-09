import { Alert, TouchableOpacity } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { reportPost } from "@/libs/supabase/api/reports";
import { Icon } from "@/components/ui";
import { supabase } from "@/libs/supabase";

const ReportButton = ({ postId }: { postId: string }) => {
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
					text: "Confirm",
					onPress: handleReportPost,
					style: "destructive",
				},
			]
		);

	return (
		<TouchableOpacity
			disabled={mutation.isLoading}
			onPress={createReportingAlert}
			hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
		>
			<Icon name="Flag" size={12} />
		</TouchableOpacity>
	);
};

export default ReportButton;
