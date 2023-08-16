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
				tabBarIcon: ({ color }) => (
					<Icon name="Home" size={24} customColor={color} />
				),
			}}
		/>
		<Tabs.Screen
			name="profile"
			options={{
				tabBarIcon: ({ color }) => (
					<Icon name="User2" size={24} customColor={color} />
				),
			}}
		/>
	</Tabs>
);

export default TabsLayout;
