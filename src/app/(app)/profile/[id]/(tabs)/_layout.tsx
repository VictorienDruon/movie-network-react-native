import { useLocalSearchParams } from "expo-router";
import { TopTabs } from "@bacons/expo-router-top-tabs";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/profiles";
import { Error } from "@/components/ui";
import { Profile } from "@/features/profile";
import ProfileSkeleton from "@/features/profile/components/ProfileSkeleton";

const TopTabsLayout = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Profile, Error>({
		queryKey: ["profile", id],
		queryFn: () => getOne(id),
	});

	if (query.isError) return <Error retry={query.refetch} />;

	return (
		<TopTabs>
			<TopTabs.Header>
				{query.isLoading ? (
					<ProfileSkeleton />
				) : (
					<Profile profile={query.data} />
				)}
			</TopTabs.Header>
			<TopTabs.Screen name="posts" initialParams={{ userId: id }} />
			<TopTabs.Screen name="likes" initialParams={{ userId: id }} />
			<TopTabs.Screen name="comments" initialParams={{ userId: id }} />
		</TopTabs>
	);
};

export default TopTabsLayout;
