import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";

const getUser = async () => {
	const {
		data: { user: dbUser },
	} = await supabase.auth.getUser();

	if (!dbUser) return null;

	const { data: user, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", dbUser.id)
		.single();

	if (error) throw error;

	return {
		id: user.id,
		name: user.name,
		avatarUrl: user.avatar_url,
	};
};

const useUser = () => {
	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});

	if (user) return user;
};

export default useUser;
