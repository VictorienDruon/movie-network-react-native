import { useEffect, useState } from "react";
import { Button } from "react-native";
import { supabase } from "@/libs/supabase";
import { Database } from "@/libs/supabase/types/database.types";
import { Avatar, Box, Layout, Text } from "@/components/ui";

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
		<Layout>
			<Box flexDirection="row">
				<Avatar src={avatar_url} size="xl" alt={name} />
				<Text variant="title">{name}</Text>
			</Box>
			<Button
				title="Sign Out"
				disabled={isLoading}
				onPress={handleSignOutPress}
			/>
		</Layout>
	);
};

export default ProfileScreen;
