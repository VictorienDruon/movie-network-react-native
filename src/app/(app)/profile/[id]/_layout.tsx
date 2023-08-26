import { useLocalSearchParams } from "expo-router";
import { TopTabs } from "@bacons/expo-router-top-tabs";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/libs/supabase/types/database.types";
import { getOne } from "@/libs/supabase/api/profiles";
import {
	Avatar,
	HStack,
	Heading,
	VStack,
	Error,
	Title,
	Subtitle,
	Skeleton,
} from "@/components/ui";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

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
					<HStack
						justifyContent="space-between"
						alignItems="center"
						height={126}
						px={16}
						space={8}
					>
						<VStack space={8}>
							<Skeleton width={64} height={64} borderRadius="full" />
							<Skeleton width={128} height={24} />
						</VStack>
						<VStack alignItems="center" space={4}>
							<Skeleton width={40} height={16} />
							<Skeleton width={64} height={16} />
						</VStack>
						<VStack alignItems="center" space={4}>
							<Skeleton width={40} height={16} />
							<Skeleton width={64} height={16} />
						</VStack>
					</HStack>
				) : (
					<HStack
						justifyContent="space-between"
						alignItems="center"
						height={126}
						px={16}
						space={8}
					>
						<VStack space={8}>
							<Avatar
								size={64}
								src={query.data.avatar_url}
								alt={query.data.name}
							/>
							<Heading>{query.data.name}</Heading>
						</VStack>
						<VStack alignItems="center" space={4}>
							<Title>128</Title>
							<Subtitle color="neutral-12">Following</Subtitle>
						</VStack>
						<VStack alignItems="center" space={4}>
							<Title>42</Title>
							<Subtitle color="neutral-12">Followers</Subtitle>
						</VStack>
					</HStack>
				)}
			</TopTabs.Header>
			<TopTabs.Screen name="posts" initialParams={{ userId: id }} />
			<TopTabs.Screen name="likes" initialParams={{ userId: id }} />
			<TopTabs.Screen name="comments" initialParams={{ userId: id }} />
		</TopTabs>
	);
};

export default TopTabsLayout;
