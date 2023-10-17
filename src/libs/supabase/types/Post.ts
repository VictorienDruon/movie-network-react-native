import { Database } from "./database.types";

type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	likes: { user_id: Database["public"]["Tables"]["likes"]["Row"]["user_id"] }[];
	posts_media: { posters: Database["public"]["Tables"]["media"]["Row"] }[];
};

export default Post;
