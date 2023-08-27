import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { Avatar, HStack, Title } from "@/components/ui";

export type User = Database["public"]["Tables"]["profiles"]["Row"];

export const User = ({ user }: { user: User }) => {
	const { id, name, avatar_url } = user;

	return (
		<HStack p={16} space={8} alignItems="center">
			<Link
				href={{
					pathname: "/(app)/profile/[id]/(tabs)",
					params: { id },
				}}
				asChild
			>
				<TouchableOpacity>
					<Avatar size={40} src={avatar_url} alt={name} />
				</TouchableOpacity>
			</Link>

			<Title>{name}</Title>
		</HStack>
	);
};
