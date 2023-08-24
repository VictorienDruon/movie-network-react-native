import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TopTabs } from "@bacons/expo-router-top-tabs";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/libs/supabase/types/database.types";
import { getOne } from "@/libs/supabase/api/profiles";
import { Avatar, HStack, Heading, VStack } from "@/components/ui";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const TopTabsLayout = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Profile, Error>({
		queryKey: ["profile", id],
		queryFn: () => getOne(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<TopTabs screenOptions={{}}>
			<TopTabs.Header>
				<HStack px={16} py={8} space={8}>
					<VStack space={8}>
						<Avatar
							size={64}
							src={query.data.avatar_url}
							alt={query.data.name}
						/>
						<Heading>{query.data.name}</Heading>
					</VStack>
				</HStack>
			</TopTabs.Header>
			<TopTabs.Screen name="posts" initialParams={{ userId: id }} />
			<TopTabs.Screen name="likes" initialParams={{ userId: id }} />
			<TopTabs.Screen name="comments" initialParams={{ userId: id }} />
		</TopTabs>
	);
};

export default TopTabsLayout;
