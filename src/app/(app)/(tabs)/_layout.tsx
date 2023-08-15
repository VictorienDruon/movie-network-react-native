import { Tabs } from "expo-router";
import { Icon } from "@/components/ui";

const TabsLayout = () => (
	<Tabs
		screenOptions={{
			headerShown: false,
			tabBarShowLabel: false,
		}}
	>
		<Tabs.Screen
			name="index"
			options={{
				tabBarIcon: ({ color }) => <Icon name="Home" size="xl" color={color} />,
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

export default TabsLayout;
