import { supabase } from "..";

export async function reportPost({
	reporterUserId,
	reportedPostId,
}: {
	reporterUserId: string;
	reportedPostId: string;
}) {
	const { data, error } = await supabase.from("reported_posts").insert({
		reporter_user_id: reporterUserId,
		reported_post_id: reportedPostId,
	});

	if (error) throw error;

	return { reporterUserId, reportedPostId };
}

export async function reportComment({
	reporterUserId,
	reportedCommentId,
}: {
	reporterUserId: string;
	reportedCommentId: string;
}) {
	const { data, error } = await supabase.from("reported_comments").insert({
		reporter_user_id: reporterUserId,
		reported_comment_id: reportedCommentId,
	});

	if (error) throw error;

	return { reporterUserId, reportedCommentId };
}
