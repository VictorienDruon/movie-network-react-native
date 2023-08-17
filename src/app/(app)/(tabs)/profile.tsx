import { useEffect, useState } from "react";
import { Button } from "react-native";
import { supabase } from "@/libs/supabase";
import { Database } from "@/libs/supabase/types/database.types";
import { Avatar, VStack, HStack, Title } from "@/components/ui";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const ProfileScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState<Profile>();

	const handleSignOutPress = async () => {
		try {
			setIsLoading(true);
			const { error } = await supabase.auth.signOut();
			if (error) throw new Error("Error signing out: " + error.message);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const getUser = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		setProfile({
			id: user.id,
			name: user.user_metadata.full_name,
			avatar_url: user.user_metadata.avatar_url,
		});
	};

	useEffect(() => {
		getUser();
	}, []);

	if (!profile) return null;

	const { name, avatar_url } = profile;

	return (
		<VStack space={16} pt={64} px={16}>
			<HStack space={16} alignItems="center">
				<Avatar src={avatar_url} size={72} alt={name} />
				<Title>{name}</Title>
			</HStack>
			<Button
				title="Sign Out"
				disabled={isLoading}
				onPress={handleSignOutPress}
			/>
		</VStack>
	);
};

export default ProfileScreen;
