import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/libs/tmdb/api/trending";
import { ErrorState } from "@/components/commons";
import PosterCardsLayout from "./PosterCardsLayout";
import PosterCardsLayoutSkeleton from "./PosterCardsLayoutSkeleton";
import Poster from "../types/Poster";

const PosterPreview = () => {
	const query = useQuery({
		queryKey: ["posters"],
		queryFn: () => getTrends("all", "day"),
	});

	if (query.isLoading) {
		<PosterCardsLayoutSkeleton length={2} />;
	}

	if (query.isError) return <ErrorState retry={query.refetch} />;

	if (query.data)
		return (
			<PosterCardsLayout
				posters={query.data.results.slice(0, 2) as Poster[]}
				action="none"
			/>
		);
};

export default PosterPreview;
