import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import useUser from "@/hooks/useUser";
import { Avatar, Box, Icon, Link } from "@/components/ui";

const TabsLayout = () => {
	const navigation = useNavigation();
	const user = useUser();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
					>
						<Box mx={20}>
							{user ? (
								<Avatar src={user.avatarUrl} name={user.name} size={32} />
							) : (
								<Icon name="User2" size={28} color="neutral-9" />
							)}
						</Box>
					</TouchableOpacity>
				),
			}}
		>
			<Tabs.Screen
				name="watchlist"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<Icon name="Home" size={24} customColor={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<Icon name="Compass" size={24} customColor={color} />
					),
					headerRight: () => (
						<Link href="/search">
							<Box mx={20}>
								<Icon name="Search" size={28} color="neutral-9" />
							</Box>
						</Link>
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
