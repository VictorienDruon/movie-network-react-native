interface Comment {
	id: string;
	createdAt: string;
	content: string;
	postId: string;
	userId: string;
	author: {
		id: string;
		name: string;
		avatarUrl: string;
	};
}

export default Comment;
