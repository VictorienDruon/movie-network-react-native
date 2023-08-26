import { Link } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { useSession } from "@/providers/session";
import { HStack, VStack, Avatar, Heading, Button, Body } from "@/components/ui";
import { TouchableOpacity } from "react-native";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const Profile = ({ profile }: { profile: Profile }) => {
	const { id, name, avatar_url } = profile;
	const { user } = useSession();

	return (
		<HStack
			justifyContent="space-between"
			alignItems="flex-end"
			p={16}
			space={8}
		>
			<VStack space={8}>
				<Avatar size={64} src={avatar_url} alt={name} />

				<Heading>{name}</Heading>

				<HStack space={6}>
					<Link href={{}} asChild>
						<TouchableOpacity>
							<HStack space={4}>
								<Body fontWeight="bold">128</Body>
								<Body>Following</Body>
							</HStack>
						</TouchableOpacity>
					</Link>

					<Body>•</Body>

					<Link href={{}} asChild>
						<TouchableOpacity>
							<HStack space={4}>
								<Body fontWeight="bold">42</Body>
								<Body>Followers</Body>
							</HStack>
						</TouchableOpacity>
					</Link>
				</HStack>
			</VStack>

			{user.id !== id && (
				<Button variant="ghost" size="lg">
					Follow
				</Button>
			)}
		</HStack>
	);
};
