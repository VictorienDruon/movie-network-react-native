import { RawPost, formatPost } from "@/libs/supabase/utils/map";
import { supabase } from "..";
import { Database } from "../types/database.types";

export type NewPost = Database["public"]["Tables"]["posts"]["Insert"] & {
	posters: Database["public"]["Tables"]["posters"]["Insert"][];
};

export async function getOne(id: string) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: post, error } = await supabase
		.from("posts")
		.select(
			"*, author: profiles(*), likes(user_id), posts_posters(posters: poster_id(*))"
		)
		.eq("id", id)
		.returns<RawPost>()
		.single();

	if (error) throw error;

	return formatPost(post, session.user.id);
}

export async function getAll(pageParam: number, pageCount = 10) {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data, error } = await supabase
		.from("posts")
		.select(
			"*, author: profiles(*), likes(user_id), posts_posters(posters: poster_id(*))"
		)
		.order("created_at", { ascending: false })
		.range(from, to)
		.returns<RawPost[]>();

	if (error) throw error;

	const posts = data.slice(0, pageCount);
	const nextPost = data.slice(pageCount);

	return {
		posts: posts.map((post) => formatPost(post, session.user.id)),
		nextCursor: nextPost.length ? pageParam + 1 : undefined,
	};
}

export async function getAllByUser(
	userId: string,
	pageParam: number,
	pageCount = 10
) {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data, error } = await supabase
		.from("posts")
		.select(
			"*, author: profiles(*), likes(user_id), posts_posters(posters: poster_id(*))"
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to)
		.returns<RawPost[]>();

	if (error) throw error;

	const posts = data.slice(0, pageCount);
	const nextPost = data.slice(pageCount);

	return {
		posts: posts.map((post) => formatPost(post, session.user.id)),
		nextCursor: nextPost.length ? pageParam + 1 : undefined,
	};
}

export async function create(newPost: NewPost) {
	const { data: post, error: postError } = await supabase
		.from("posts")
		.insert({ content: newPost.content, user_id: newPost.user_id })
		.select()
		.single();

	if (postError) throw postError;

	const { data: posters, error: postersError } = await supabase
		.from("posters")
		.upsert(newPost.posters)
		.select();

	if (postersError) throw postersError;

	const postsPosters = posters.map((poster) => ({
		post_id: post.id,
		poster_id: poster.uuid,
	}));

	const { error: postsPostersError } = await supabase
		.from("posts_posters")
		.insert(postsPosters);

	if (postsPostersError) throw postsPostersError;

	return newPost;
}
