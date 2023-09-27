import { Box } from "@/components/ui";
import PosterCard from "..";
import Poster from "../types/Poster";

const PosterCardsLayout = ({ posters }: { posters: Poster[] }) => {
	switch (posters.length) {
		case 1:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCard
						poster={posters[0]}
						size="lg"
						decoration="shadow"
						textPosition="top"
					/>
				</Box>
			);
		case 2:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCard
						poster={posters[0]}
						size="md"
						decoration="shadow"
						textPosition="top"
						right={50}
						rotate="-3deg"
					/>
					<PosterCard
						poster={posters[1]}
						size="md"
						decoration="shadow"
						textPosition="top"
						top={-140}
						left={50}
						rotate="3deg"
					/>
				</Box>
			);
		case 3:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCard
						poster={posters[0]}
						size="sm"
						decoration="shadow"
						textPosition="top"
						right={60}
						rotate="-4deg"
					/>
					<PosterCard
						poster={posters[1]}
						size="sm"
						decoration="shadow"
						textPosition="top"
						top={-100}
						left={60}
						rotate="4deg"
					/>
					<PosterCard
						poster={posters[2]}
						size="sm"
						decoration="shadow"
						textPosition="top"
						top={-145}
						right={15}
					/>
				</Box>
			);
		default:
			return null;
	}
};

export default PosterCardsLayout;
