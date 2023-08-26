import { Link, Tabs } from "expo-router";
import { useSession } from "@/providers/session";
import { Avatar, Box, Icon } from "@/components/ui";
import { TouchableOpacity } from "react-native";

const TabsLayout = () => {
	const { user } = useSession();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerLeft: () => {
					return (
						user && (
							<Link
								href={{
									pathname: "/(app)/profile/[id]/(tabs)",
									params: { id: user.id },
								}}
								asChild
							>
								<TouchableOpacity>
									<Box px={16}>
										<Avatar src={user.avatar_url} size={32} alt={user.name} />
									</Box>
								</TouchableOpacity>
							</Link>
						)
					);
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Feed",
					tabBarIcon: ({ color }) => (
						<Icon name="Home" size={24} customColor={color} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
