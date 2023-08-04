import { Database } from "@/libs/supabase/database.types";
import Author from "./Author";

type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Author;
};

export default Comment;
