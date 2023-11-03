import { TouchableOpacity } from "react-native";
import { useErrorBoundary } from "react-error-boundary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import { supabase } from "@/libs/supabase";
import { handleUserUpdated, uploadAvatar } from "@/libs/supabase/api/storage";
import { Avatar, Skeleton, Subtitle, VStack } from "@/components/ui";

const AvatarEditor = () => {
	const queryClient = useQueryClient();
	const { showBoundary } = useErrorBoundary();
	const user = useUser();

	const mutation = useMutation(uploadAvatar, {
		onSuccess: (userId) => handleUserUpdated(userId, queryClient),
	});

	const handleUploadAvatar = async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			await mutation.mutateAsync(user.id);
		} catch (error) {
			showBoundary(error);
		}
	};

	return (
		<VStack alignItems="center" space={8}>
			{user ? (
				<Avatar src={user.avatarUrl} name={user.name} size={96} />
			) : (
				<Skeleton width={96} height={96} borderRadius="full" />
			)}

			<TouchableOpacity
				onPress={handleUploadAvatar}
				disabled={mutation.isLoading}
			>
				<Subtitle color="primary-9">Change your avatar</Subtitle>
			</TouchableOpacity>
		</VStack>
	);
};

export default AvatarEditor;
