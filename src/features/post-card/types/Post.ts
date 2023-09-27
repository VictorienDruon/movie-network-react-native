import { Database } from "@/libs/supabase/types/database.types";
import Poster from "@/features/poster-card/types/Poster";

type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	posters: Poster[];
	user_has_liked_post: boolean;
};

export default Post;