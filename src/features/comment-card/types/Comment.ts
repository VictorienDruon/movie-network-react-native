import { Database } from "@/libs/supabase/types/database.types";

type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
};

export default Comment;