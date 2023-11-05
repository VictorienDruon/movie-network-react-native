import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NameSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import {
	handleProfileUpdated,
	updateProfile,
} from "@/libs/supabase/api/profiles";
import useUser from "@/hooks/useUser";
import { Box, HStack, Input, Subtitle, Title } from "@/components/ui";
import { TouchableOpacity } from "react-native-gesture-handler";

const NameEditor = () => {
	const queryClient = useQueryClient();
	const user = useUser();

	const { control, formState, handleSubmit, reset } = useForm<NameSchema>({
		resolver: zodResolver(NameSchema),
	});

	const updateName = async (name: string) => {
		const { error: updateUserError } = await supabase.auth.updateUser({
			data: { full_name: name },
		});

		if (updateUserError) throw updateUserError;

		const {
			data: { user },
		} = await supabase.auth.getUser();

		await updateProfile({ id: user.id, updates: { name } });

		return user.id;
	};

	const mutation = useMutation(updateName, {
		onSuccess: (id) => handleProfileUpdated(id, queryClient),
	});

	const handleCommentSubmit = handleSubmit(async ({ name }: NameSchema) => {
		reset();
		mutation.mutate(name);
	});

	return (
		<HStack
			alignItems="center"
			width="100%"
			height={48}
			p={16}
			space={8}
			bg="neutral-3"
			borderRadius="xl"
		>
			<Controller
				name="name"
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						flex={1}
						placeholder={user.name ?? "Enter your name"}
						color="neutral-12"
						placeholderTextColor="neutral-9"
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
					/>
				)}
			/>

			{formState.isValid && (
				<TouchableOpacity onPress={handleCommentSubmit}>
					<Box justifyContent="center" alignItems="center">
						<Subtitle color="primary-9">Save</Subtitle>
					</Box>
				</TouchableOpacity>
			)}
		</HStack>
	);
};

export default NameEditor;
