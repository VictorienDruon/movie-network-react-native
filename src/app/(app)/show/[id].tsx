import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Body, Box } from "@/components/ui";
import { getShow } from "@/libs/axios/api/details";
import { ShowDetails } from "@/libs/axios/types/Show";

const MediaScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<ShowDetails, Error>({
		queryKey: ["show", id],
		queryFn: () => getShow(id),
	});

	return (
		<Box>
			<Body>Show</Body>
		</Box>
	);
};

export default MediaScreen;
