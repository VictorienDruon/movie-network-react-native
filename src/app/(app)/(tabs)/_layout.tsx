import { Tabs } from "expo-router";
import { Home, User2 } from "lucide-react-native";

const AppLayout = () => (
	<Tabs>
		<Tabs.Screen
			name="index"
			options={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarIcon: ({ color }) => <Home size={28} color={color} />,
			}}
		/>
		<Tabs.Screen
			name="profile"
			options={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarIcon: ({ color }) => <User2 size={28} color={color} />,
			}}
		/>
	</Tabs>
);

export default AppLayout;
