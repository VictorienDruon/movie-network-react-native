import { FlatList } from "react-native";
import { Box } from "@/components/ui";
import { Poster } from "./component/poster";

const PostersLayout = ({ posters }: { posters: Poster[] }) => {
	if (posters.length > 30) return null;

	switch (posters.length) {
		case 0:
			return null;
		case 1:
			return <Poster poster={posters[0]} size="lg" />;
		case 2:
			return (
				<>
					<Poster poster={posters[0]} size="md" right={66} rotate="-3deg" />
					<Poster
						poster={posters[1]}
						size="md"
						top={-150}
						left={66}
						rotate="3deg"
					/>
				</>
			);
		case 3:
			return (
				<>
					<Poster poster={posters[0]} size="sm" right={75} rotate="-5deg" />
					<Poster
						poster={posters[1]}
						size="sm"
						top={-150}
						left={75}
						rotate="5deg"
					/>
					<Poster poster={posters[2]} size="sm" top={-240} right={15} />
				</>
			);
		default:
			return (
				<Box aspectRatio={5 / 7}>
					<FlatList
						data={posters}
						keyExtractor={(poster) => poster.id.toString()}
						renderItem={({ item: poster }) => (
							<Poster poster={poster} size="lg" shadow={false} />
						)}
						showsHorizontalScrollIndicator={false}
						horizontal
						pagingEnabled
					/>
				</Box>
			);
	}
};

export default PostersLayout;
