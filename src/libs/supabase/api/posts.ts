import { router } from "expo-router";
import { QueryClient } from "@tanstack/react-query";
import Post from "@/features/post-card/types/Post";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import { supabase } from "..";
import { Database } from "../types/database.types";
import DbPost from "../types/Post";
import NewMedia from "../types/NewMedia";
import { formatPost } from "../utils/map";
import { getPage, getRange } from "../utils/pagination";
import { convertKeysToCamelCase } from "@/utils/objects";
import { getBlockedUsers } from "./blocked-users";

type NewPost = Database["public"]["Tables"]["posts"]["Insert"] & {
	posters: NewMedia[];
};

export async function getPost(id: string): Promise<Post> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: post, error } = await supabase
		.from("posts")
		.select(
			"*, author: profiles!posts_user_id_fkey(*), likes(user_id), posts_media(posters: media_id(*))"
		)
		.eq("id", id)
		.returns<DbPost>()
		.single();

	if (error) throw error;

	return formatPost(post, session.user.id);
}

export async function getPosts(page: number) {
	const { from, to } = getRange(page);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const blockedUserIds = await getBlockedUsers(user.id);

	const { data, error } = await supabase
		.from("posts")
		.select(
			"*, author: profiles!posts_user_id_fkey(*), likes(user_id), posts_media(posters: media_id(*))"
		)
		.order("created_at", { ascending: false })
		.range(from, to)
		.returns<DbPost[]>();

	if (error) throw error;

	const posts = data.filter((post) => !blockedUserIds.includes(post.user_id));

	const formattedPosts = posts.map((post) => formatPost(post, user.id));

	return getPage<Post>(formattedPosts, page);
}

export async function getPostsByUser(userId: string, page: number) {
	const { from, to } = getRange(page);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: posts, error } = await supabase
		.from("posts")
		.select(
			"*, author: profiles!posts_user_id_fkey(*), likes(user_id), posts_media(posters: media_id(*))"
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to)
		.returns<DbPost[]>();

	if (error) throw error;

	const formattedPosts = posts.map((post) => formatPost(post, session.user.id));

	return getPage<Post>(formattedPosts, page);
}

export async function createPost(newPost: NewPost): Promise<Post> {
	const { data: post, error: postError } = await supabase
		.from("posts")
		.insert({ content: newPost.content, user_id: newPost.user_id })
		.select("*, author: profiles!posts_user_id_fkey(*)")
		.single();

	if (postError) throw postError;

	const { data: posters, error: postersError } = await supabase
		.from("media")
		.upsert(newPost.posters)
		.select();

	if (postersError) throw postersError;

	const postsMedia = posters.map((poster) => ({
		post_id: post.id,
		media_id: poster.uuid,
	}));

	const { error: postsPostersError } = await supabase
		.from("posts_media")
		.insert(postsMedia);

	if (postsPostersError) throw postsPostersError;

	return {
		id: post.id,
		content: post.content,
		createdAt: post.created_at,
		posters: posters.map(convertKeysToCamelCase<Poster>),
		author: convertKeysToCamelCase<Person>(post.author),
		userHasLikedPost: false,
	};
}

export function handlePostSuccess(post: Post, queryClient: QueryClient) {
	const { author } = post;

	queryClient.invalidateQueries({
		queryKey: ["feed"],
	});
	queryClient.invalidateQueries({
		queryKey: ["posts", author.id],
	});
	router.push("..");
}
