import { Box } from "@/components/ui";
import PosterCard, { PosterCardProps } from "..";
import Poster from "../types/Poster";

interface PosterCardsLayoutProps extends Omit<PosterCardProps, "poster"> {
	posters: Poster[];
}

const PosterCardsLayout = ({ posters, ...props }: PosterCardsLayoutProps) => {
	switch (posters.length) {
		case 1:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCard
						poster={posters[0]}
						size="lg"
						decoration="shadow"
						textPosition="top"
						{...props}
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
						{...props}
					/>
					<PosterCard
						poster={posters[1]}
						size="md"
						decoration="shadow"
						textPosition="top"
						top={-140}
						left={50}
						rotate="3deg"
						{...props}
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
						{...props}
					/>
					<PosterCard
						poster={posters[1]}
						size="sm"
						decoration="shadow"
						textPosition="top"
						top={-100}
						left={60}
						rotate="4deg"
						{...props}
					/>
					<PosterCard
						poster={posters[2]}
						size="sm"
						decoration="shadow"
						textPosition="top"
						top={-145}
						right={15}
						{...props}
					/>
				</Box>
			);
		default:
			return null;
	}
};

export default PosterCardsLayout;
