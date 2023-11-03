import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { appConfig } from "@/config/app";
import useUser from "@/hooks/useUser";
import {
	Avatar,
	Link,
	HStack,
	Heading,
	Icon,
	Skeleton,
	Title,
	VStack,
} from "@/components/ui";

const DrawerLayout = () => {
	const user = useUser();

	return (
		<Drawer
			screenOptions={{
				headerShown: false,
			}}
			drawerContent={() => (
				<DrawerContentScrollView
					scrollEnabled={false}
					contentContainerStyle={{ height: "90%" }}
				>
					<VStack flex={1} justifyContent="space-between" px={20} space={64}>
						<Link
							href={
								user && {
									pathname: "/profile/[id]",
									params: { id: user.id },
								}
							}
						>
							{user ? (
								<VStack space={20}>
									<Avatar size={40} src={user.avatarUrl} name={user.name} />
									<Heading>{user.name}</Heading>
								</VStack>
							) : (
								<VStack space={20}>
									<Skeleton width={40} height={40} borderRadius="full" />
									<Skeleton width={150} height={24} borderRadius="md" />
								</VStack>
							)}
						</Link>

						<VStack space={32}>
							<Link
								href={
									user && {
										pathname: "/profile/[id]",
										params: { id: user.id },
									}
								}
							>
								<HStack alignItems="center" space={24}>
									<Icon name="User2" size={24} color="neutral-12" />
									<Heading fontWeight="600">Profile</Heading>
								</HStack>
							</Link>

							<Link href="/profile/edit">
								<HStack alignItems="center" space={24}>
									<Icon
										name="PencilRuler"
										size={24}
										strokeWidth={2}
										color="neutral-12"
									/>
									<Heading fontWeight="600">Edit</Heading>
								</HStack>
							</Link>

							<Link href="/profile/settings">
								<HStack alignItems="center" space={24}>
									<Icon
										name="Cog"
										size={24}
										strokeWidth={2}
										color="neutral-12"
									/>
									<Heading fontWeight="600">Settings</Heading>
								</HStack>
							</Link>
						</VStack>

						<VStack
							space={20}
							pt={20}
							borderTopWidth={0.5}
							borderColor="neutral-6"
						>
							<Link href={appConfig.links.contact}>
								<Title fontWeight="500">Contact us</Title>
							</Link>

							<Link href={appConfig.links.featureRequests}>
								<Title fontWeight="500">Feature requests</Title>
							</Link>
							<Link href={appConfig.links.site + "/terms"}>
								<Title fontWeight="500">Terms of service</Title>
							</Link>

							<Link href={appConfig.links.site + "/privacy"}>
								<Title fontWeight="500">Privacy policy</Title>
							</Link>

							<Link href={appConfig.links.site + "/credits"}>
								<Title fontWeight="500">Credits</Title>
							</Link>
						</VStack>
					</VStack>
				</DrawerContentScrollView>
			)}
		/>
	);
};

export default DrawerLayout;
