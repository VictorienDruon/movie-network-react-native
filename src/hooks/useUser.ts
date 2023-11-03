import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";

interface User {
	id: string;
	name: string;
	avatarUrl: string;
}

const getUser = async () => {
	const {
		data: { user: dbUser },
	} = await supabase.auth.getUser();

	const user: User = {
		id: dbUser.id,
		name: dbUser.user_metadata.full_name,
		avatarUrl: dbUser.user_metadata.avatar_url,
	};

	return user;
};

const useUser = () => {
	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});

	if (user) return user;
};

export default useUser;
