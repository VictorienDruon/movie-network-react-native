import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import { NewPost, create } from "@/libs/supabase/api/posts";
import { useSession } from "@/providers/session";
import { usePosters } from "@/providers/posters";
import {
	Avatar,
	Box,
	Button,
	HStack,
	Icon,
	Title,
	VStack,
	Input,
	Link,
} from "@/components/ui";
import PostersLayout from "@/features/poster/components/PostersLayout";

const CreateScreen = () => {
	const queryClient = useQueryClient();
	const { user } = useSession();
	const { posters } = usePosters();

	const { control, formState, handleSubmit } = useForm<PostSchema>({
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
			router.push("..");
		},
	});

	const handlePostSubmit = handleSubmit(async ({ content }: PostSchema) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({ content, user_id: user.id, posters });
	});

	return (
		<Box flex={1} pb={48}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<VStack flex={1} space={28} p={32}>
					<HStack justifyContent="space-between" alignItems="center" space={16}>
						<HStack alignItems="center" space={16}>
							{user && (
								<Avatar src={user.avatar_url} size={40} alt="Your avatar" />
							)}

							{user && <Title>{user.name}</Title>}
						</HStack>

						<Button variant="outline" size="sm" rightIcon="Globe">
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

					<PostersLayout posters={posters} />
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
					px={32}
					space={32}
					borderTopWidth={0.5}
					borderColor="neutral-6"
				>
					<HStack space={32}>
						<Link
							href={{
								pathname: "/post/create/posters-picker/[type]",
								params: { type: "movie" },
							}}
						>
							<Icon name="Clapperboard" color="primary-9" size={24} />
						</Link>

						<Link
							href={{
								pathname: "/post/create/posters-picker/[type]",
								params: { type: "tv" },
							}}
						>
							<Icon name="Tv" color="primary-9" size={24} />
						</Link>
					</HStack>

					<Button
						rightIcon="ArrowRight"
						disabled={!formState.isValid || mutation.isLoading}
						onPress={handlePostSubmit}
					>
						Post
					</Button>
				</HStack>
			</KeyboardAvoidingView>
		</Box>
	);
};

export default CreateScreen;
