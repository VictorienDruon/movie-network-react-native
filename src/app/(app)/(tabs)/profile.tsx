import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/providers/session";
import { getOne } from "@/libs/supabase/api/profiles";
import { Profile } from "@/features/profile";

const ProfileScreen = () => {
	const { user } = useSession();

	const query = useQuery<Profile, Error>({
		queryKey: ["profile", user.id],
		queryFn: () => getOne(user.id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Profile profile={query.data} />;
};

export default ProfileScreen;
