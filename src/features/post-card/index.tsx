import { getRelativeDate } from "@/utils/dates";
import {
	Body,
	Metadata,
	HStack,
	VStack,
	Avatar,
	Title,
	Link,
	RoundButton,
} from "@/components/ui";
import PosterCardsLayout from "@/features/poster-card/components/PosterCardsLayout";
import Post from "./types/Post";
import CommentBar from "./components/CommentBar";
import LikeButton from "./components/LikeButton";
import ActionsMenu from "./components/ActionsMenu";

const PostCard = ({ post }: { post: Post }) => {
	const { id, content, createdAt, author, posters, userHasLikedPost } = post;

	return (
		<VStack space={20} p={16}>
			<HStack justifyContent="space-between" space={24}>
				<Link href={author.link}>
					<HStack alignItems="center" maxWidth="85%" space={12}>
						<Avatar size={40} src={author.avatarUrl} name={author.name} />

						<VStack space={4}>
							<Title numberOfLines={1} ellipsizeMode="tail">
								{author.name}
							</Title>

							<Metadata>{getRelativeDate(createdAt)}</Metadata>
						</VStack>
					</HStack>
				</Link>

				<ActionsMenu postId={id} authorId={author.id} />
			</HStack>

			<Body>{content}</Body>

			<PosterCardsLayout posters={posters} />

			<HStack space={8}>
				<CommentBar postId={id} />

				<RoundButton
					variant="secondary"
					size="sm"
					icon="MessageSquare"
					href={{
						pathname: "/post/[id]/comments",
						params: { id },
					}}
				/>

				<LikeButton postId={id} userHasLikedPost={userHasLikedPost} />
			</HStack>
		</VStack>
	);
};

export default PostCard;
