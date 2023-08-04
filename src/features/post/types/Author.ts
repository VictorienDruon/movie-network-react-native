import { Database } from "@/libs/supabase/database.types";

type Author = Database["public"]["Tables"]["profiles"]["Row"];

export default Author;
