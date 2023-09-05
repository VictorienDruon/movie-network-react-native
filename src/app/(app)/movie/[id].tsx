import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Body, Box } from "@/components/ui";
import { getMovie } from "@/libs/axios/api/details";
import { MovieDetails } from "@/libs/axios/types/Movie";

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<MovieDetails, Error>({
		queryKey: ["media", id],
		queryFn: () => getMovie(id),
	});

	query.data && console.log(query.data.providers);

	return (
		<Box>
			<Body>Hello</Body>
		</Box>
	);
};

export default MovieScreen;
