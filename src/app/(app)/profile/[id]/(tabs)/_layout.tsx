import { createContext, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { TopTabs } from "@bacons/expo-router-top-tabs";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/profiles";
import { ErrorState } from "@/components/common";
import { Profile } from "@/features/profile";
import ProfileSkeleton from "@/features/profile/components/ProfileSkeleton";

const ParamsContext = createContext<{ [key: string]: any }>(null);

const ProfileLayout = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Profile, Error>({
		queryKey: ["profile", id],
		queryFn: () => getOne(id),
	});

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<ParamsContext.Provider value={{ userId: id }}>
			<TopTabs>
				<TopTabs.Header>
					{query.isLoading ? (
						<ProfileSkeleton />
					) : (
						<Profile profile={query.data} />
					)}
				</TopTabs.Header>
				<TopTabs.Screen name="posts" />
				<TopTabs.Screen name="likes" />
				<TopTabs.Screen name="comments" />
			</TopTabs>
		</ParamsContext.Provider>
	);
};

export const useParams = () => useContext(ParamsContext);

export default ProfileLayout;
