import { Database } from "./database.types";

type NewMedia = Database["public"]["Tables"]["media"]["Insert"];

export default NewMedia;
