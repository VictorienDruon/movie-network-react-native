import { Box } from "@/components/ui";
import PosterCardSkeleton from "./PosterSkeleton";

const PosterCardsLayoutSkeleton = ({ length }: { length: number }) => {
	switch (length) {
		case 1:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCardSkeleton size="lg" textPosition="top" />
				</Box>
			);
		case 2:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCardSkeleton
						size="md"
						textPosition="top"
						position="relative"
						right={50}
						style={{ transform: [{ rotate: "-4deg" }] }}
					/>
					<PosterCardSkeleton
						size="md"
						textPosition="top"
						position="relative"
						top={-140}
						left={50}
						style={{ transform: [{ rotate: "4deg" }] }}
					/>
				</Box>
			);
		case 3:
			return (
				<Box position="relative" alignItems="center" maxHeight={280}>
					<PosterCardSkeleton
						size="sm"
						textPosition="top"
						position="relative"
						right={60}
						style={{ transform: [{ rotate: "-4deg" }] }}
					/>
					<PosterCardSkeleton
						size="sm"
						textPosition="top"
						position="relative"
						top={-100}
						left={60}
						style={{ transform: [{ rotate: "4deg" }] }}
					/>
					<PosterCardSkeleton
						size="sm"
						textPosition="top"
						position="relative"
						top={-145}
						right={15}
					/>
				</Box>
			);
		default:
			return null;
	}
};

export default PosterCardsLayoutSkeleton;
