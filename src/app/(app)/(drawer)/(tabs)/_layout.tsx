import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import { useSession } from "@/providers/session";
import { Avatar, Box, Icon } from "@/components/ui";

const TabsLayout = () => {
	const navigation = useNavigation();
	const { user } = useSession();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerLeft: () =>
					user && (
						<TouchableOpacity
							onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
						>
							<Box px={20}>
								<Avatar src={user.avatar_url} alt="Drawer" size={32} />
							</Box>
						</TouchableOpacity>
					),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<Icon name="Home" size={24} customColor={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="feed"
				options={{
					title: "Feed",
					tabBarIcon: ({ color, focused }) => (
						<Icon name="Zap" size={24} customColor={color} fill={focused} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
