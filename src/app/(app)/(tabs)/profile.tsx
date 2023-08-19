import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/libs/supabase/api";
import { Profile } from "@/features/profile";

const ProfileScreen = () => {
	const query = useQuery<Profile, Error>({
		queryKey: ["profile"],
		queryFn: () => getProfile(),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Profile profile={query.data} />;
};

export default ProfileScreen;
