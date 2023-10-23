import { Database } from "./database.types";

type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
};

export default Comment;
