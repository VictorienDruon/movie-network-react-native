import { TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Link } from "expo-router";
import { openURL } from "expo-linking";
import { Drawer } from "expo-router/drawer";
import { useSession } from "@/providers/session";
import { Avatar, HStack, Heading, Icon, Title, VStack } from "@/components/ui";

const DrawerLayout = () => {
	const { user } = useSession();

	return (
		<Drawer
			screenOptions={{
				headerShown: false,
			}}
			drawerContent={() => (
				<DrawerContentScrollView contentContainerStyle={{ height: "100%" }}>
					{user && (
						<VStack
							flex={1}
							justifyContent="space-between"
							px={20}
							pt={20}
							pb={96}
							space={64}
						>
							<Link
								href={{
									pathname: "/(app)/profile/[id]/(tabs)",
									params: { id: user.id },
								}}
								asChild
							>
								<TouchableOpacity>
									<VStack space={20}>
										<Avatar size={40} src={user.avatar_url} alt="Your avatar" />
										<Heading>{user.name}</Heading>
									</VStack>
								</TouchableOpacity>
							</Link>

							<VStack space={32}>
								<Link
									href={{
										pathname: "/(app)/profile/[id]/(tabs)",
										params: { id: user.id },
									}}
									asChild
								>
									<TouchableOpacity>
										<HStack alignItems="center" space={24}>
											<Icon name="User2" size={24} color="neutral-12" />
											<Heading fontWeight="600">Profile</Heading>
										</HStack>
									</TouchableOpacity>
								</Link>

								<Link href={"/(app)/profile/settings"} asChild>
									<TouchableOpacity>
										<HStack alignItems="center" space={24}>
											<Icon
												name="Cog"
												size={24}
												strokeWidth={2}
												color="neutral-12"
											/>
											<Heading fontWeight="600">Settings</Heading>
										</HStack>
									</TouchableOpacity>
								</Link>
							</VStack>

							<VStack
								space={20}
								pt={20}
								borderTopWidth={0.5}
								borderColor="neutral-6"
							>
								<TouchableOpacity
									onPress={() =>
										openURL("https://the-movie-network.vercel.app")
									}
								>
									<Title fontWeight="500">About</Title>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() =>
										openURL(
											"https://the-movie-network.vercel.app/terms-of-service"
										)
									}
								>
									<Title fontWeight="500">Terms of Service</Title>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() =>
										openURL(
											"https://the-movie-network.vercel.app/private-policy"
										)
									}
								>
									<Title fontWeight="500">Privacy Policy</Title>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() =>
										openURL("https://the-movie-network.vercel.app/credits")
									}
								>
									<Title fontWeight="500">Credits</Title>
								</TouchableOpacity>
							</VStack>
						</VStack>
					)}
				</DrawerContentScrollView>
			)}
		/>
	);
};

export default DrawerLayout;
