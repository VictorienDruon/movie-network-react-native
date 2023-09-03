import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Body, Box } from "@/components/ui";
import { getMovie } from "@/libs/axios/api/details";
import { Details } from "@/libs/axios/types/Movie";

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Details, Error>({
		queryKey: ["media", id],
		queryFn: () => getMovie(id),
	});

	return (
		<Box>
			<Body>{JSON.stringify(query.data)}</Body>
		</Box>
	);
};

export default MovieScreen;
