import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Body, Box } from "@/components/ui";
import { getMovie } from "@/libs/axios/api/details";
import { MovieDetails } from "@/libs/axios/types/Movie";

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<MovieDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => getMovie(id),
	});

	return (
		<Box>
			<Body>{id}</Body>
		</Box>
	);
};

export default MovieScreen;
