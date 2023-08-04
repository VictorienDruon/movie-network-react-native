import { Database } from "@/libs/supabase/database.types";
import Author from "./Author";

type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Author;
	user_has_liked_post: boolean;
};

export default Post;
