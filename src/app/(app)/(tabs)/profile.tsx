import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/profiles";
import { Profile } from "@/features/profile";

const ProfileScreen = () => {
	const query = useQuery<Profile, Error>({
		queryKey: ["profile"],
		queryFn: () => getOne(),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Profile profile={query.data} refetch={query.refetch} />;
};

export default ProfileScreen;
