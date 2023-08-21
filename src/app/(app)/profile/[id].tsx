import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/profiles";
import { Profile } from "@/features/profile";

const ProfileScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Profile, Error>({
		queryKey: ["profile", id],
		queryFn: () => getOne(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Profile profile={query.data} refetch={query.refetch} />;
};

export default ProfileScreen;
