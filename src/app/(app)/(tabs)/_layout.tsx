import { Tabs } from "expo-router";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/themes";
import { Icon } from "@/components/ui";

const TabsLayout = () => {
	const { colors } = useTheme<Theme>();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.accent9,
				tabBarInactiveTintColor: colors.gray9,
				tabBarStyle: { backgroundColor: colors.mainBackground },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="Home" size="xl" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="User2" size="xl" color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
