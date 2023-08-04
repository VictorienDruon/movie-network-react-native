import { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/libs/supabase";
import { Database } from "@/libs/supabase/database.types";
import { Image } from "expo-image";

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
		<SafeAreaView style={styles.container}>
			<Image style={styles.avatar} source={avatar_url} />
			<Text style={styles.name}>{name}</Text>
			<Button
				title="Sign Out"
				disabled={isLoading}
				onPress={handleSignOutPress}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profile: {
		flexDirection: "row",
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default ProfileScreen;
