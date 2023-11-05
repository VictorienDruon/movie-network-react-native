import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "..";
import { updateProfile } from "./profiles";

export const uploadAvatar = async (userId: string) => {
	const pickImage = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [1, 1],
		base64: true,
	});

	if (!pickImage.canceled) {
		const image = pickImage.assets[0];
		const imageExt = image.uri.split(".").pop();

		const path = `${userId}/${Date.now()}.${imageExt}`;
		const fileBody = decode(image.base64);
		const options = {
			contentType: `image/${imageExt}`,
			upsert: true,
		};

		const { error: uploadError } = await supabase.storage
			.from("avatars")
			.upload(path, fileBody, options);

		if (uploadError) throw uploadError;

		const {
			data: { publicUrl },
		} = supabase.storage.from("avatars").getPublicUrl(path);

		const { error: updateUserError } = await supabase.auth.updateUser({
			data: { avatar_url: publicUrl },
		});

		if (updateUserError) throw updateUserError;

		await updateProfile({ id: userId, updates: { avatar_url: publicUrl } });

		return userId;
	}
};
