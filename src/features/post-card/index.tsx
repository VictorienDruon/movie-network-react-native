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
import ReportButton from "./components/ReportButton";

const PostCard = ({ post }: { post: Post }) => {
	const { id, content, createdAt, author, posters, userHasLikedPost } = post;

	return (
		<VStack space={20} p={16}>
			<HStack justifyContent="space-between" space={8}>
				<Link href={author.link}>
					<HStack space={8} alignItems="center">
						<Avatar size={40} src={author.avatarUrl} name={author.name} />

						<Title>{author.name}</Title>
					</HStack>
				</Link>

				<HStack alignItems="center" space={4}>
					<Metadata>{getRelativeDate(createdAt)}</Metadata>

					<Metadata>•</Metadata>

					<ReportButton postId={id} />
				</HStack>
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
