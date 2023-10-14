import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";

interface Post {
	id: string;
	content: string;
	createdAt: string;
	posters: Poster[];
	author: Person;
	userHasLikedPost: boolean;
}

export default Post;
