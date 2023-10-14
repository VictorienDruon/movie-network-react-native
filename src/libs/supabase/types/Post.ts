import { Database } from "./database.types";

type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	likes: { user_id: Database["public"]["Tables"]["likes"]["Row"]["user_id"] }[];
	posts_posters: { posters: Database["public"]["Tables"]["posters"]["Row"] }[];
};

export default Post;
