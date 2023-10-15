import { Database } from "./database.types";

type Person = Database["public"]["Tables"]["profiles"]["Row"];

export default Person;
