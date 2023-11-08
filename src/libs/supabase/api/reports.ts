import { supabase } from "..";

export async function reportPost({
	reporterUserId,
	reportedPostId,
}: {
	reporterUserId: string;
	reportedPostId: string;
}) {
	const { error } = await supabase.from("reports").insert({
		reporter_user_id: reporterUserId,
		reported_post_id: reportedPostId,
	});

	if (error) throw error;

	return { reporterUserId, reportedPostId };
}
