import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { Avatar, BoxProps, HStack, Title } from "@/components/ui";

export type User = Database["public"]["Tables"]["profiles"]["Row"];

interface UserProps extends BoxProps {
	user: User;
}

export const User = ({ user, ...props }: UserProps) => {
	const { id, name, avatar_url } = user;

	return (
		<Link
			href={{
				pathname: "/(app)/profile/[id]/(tabs)",
				params: { id },
			}}
			asChild
		>
			<TouchableOpacity>
				<HStack space={8} alignItems="center" {...props}>
					<Avatar size={40} src={avatar_url} alt={name} />

					<Title>{name}</Title>
				</HStack>
			</TouchableOpacity>
		</Link>
	);
};
