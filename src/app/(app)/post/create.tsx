import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import { NewPost, create } from "@/libs/supabase/api/posts";
import { useSession } from "@/providers/session";
import {
	Avatar,
	Box,
	Button,
	HStack,
	Icon,
	Title,
	VStack,
	Input,
} from "@/components/ui";

const CreatePostScreen = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { user } = useSession();

	const { control, formState, handleSubmit, reset } = useForm<PostSchema>({
		resolver: zodResolver(PostSchema),
	});

	const mutation = useMutation<NewPost, Error, NewPost>(create, {
		onSuccess: ({ user_id }) => {
			queryClient.invalidateQueries({
				queryKey: ["feed"],
			});
			queryClient.invalidateQueries({
				queryKey: ["posts", user_id],
			});
			router.push("/");
		},
	});

	const handlePostSubmit = handleSubmit(async ({ content }: PostSchema) => {
		reset();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({ content, user_id: user.id });
	});

	return (
		<Box flex={1} pb={48}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<VStack flex={1} space={28} p={32}>
					<HStack justifyContent="space-between" alignItems="center" space={16}>
						<HStack alignItems="center" space={16}>
							<Avatar src={user.avatar_url} size={48} alt={user.name} />

							<Title>{user.name}</Title>
						</HStack>

						<Button
							variant="outline"
							size="xs"
							rightIcon="Globe"
							disabled={true}
						>
							Public
						</Button>
					</HStack>

					<Controller
						name="content"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Watched something great lately?!"
								color="neutral-12"
								fontSize={18}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								multiline
							/>
						)}
					/>
				</VStack>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={94}
			>
				<HStack
					justifyContent="space-between"
					alignItems="center"
					height={48}
					px={28}
					space={0}
					borderTopWidth={0.5}
					borderColor="neutral-6"
				>
					<HStack space={28}>
						<Icon name="Clapperboard" color="primary-9" size={24} />
						<Icon name="Tv" color="primary-9" size={24} />
						<Icon name="VenetianMask" color="primary-9" size={24} />
						<Icon name="Megaphone" color="primary-9" size={24} />
					</HStack>

					<Button
						rightIcon={formState.isValid ? "ArrowRight" : "Lock"}
						disabled={!formState.isValid}
						onPress={handlePostSubmit}
					>
						Post
					</Button>
				</HStack>
			</KeyboardAvoidingView>
		</Box>
	);
};

export default CreatePostScreen;
