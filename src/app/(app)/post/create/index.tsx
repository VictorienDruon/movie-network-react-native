import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostSchema } from "@/utils/schema";
import { convertKeysToSnakeCase } from "@/utils/objects";
import { supabase } from "@/libs/supabase";
import { createPost, handleCreatePostSuccess } from "@/libs/supabase/api/posts";
import DbPoster from "@/libs/supabase/types/NewMedia";
import useUser from "@/hooks/useUser";
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
import PosterCardsLayout from "@/features/poster-card/components/PosterCardsLayout";

const CreateScreen = () => {
	const user = useUser();
	const { posters } = usePosters();

	const queryClient = useQueryClient();

	const { control, formState, handleSubmit } = useForm<PostSchema>({
		resolver: zodResolver(PostSchema),
	});

	const mutation = useMutation(createPost, {
		onSuccess: (post) => handleCreatePostSuccess(post, queryClient),
	});

	const handlePostSubmit = handleSubmit(async ({ content }: PostSchema) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({
			content,
			user_id: user.id,
			posters: posters.map(convertKeysToSnakeCase<DbPoster>),
		});
	});

	return (
		<Box flex={1} pb={48}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<VStack flex={1} space={28} p={32}>
					<HStack justifyContent="space-between" alignItems="center" space={16}>
						<HStack alignItems="center" space={16}>
							{user && (
								<Avatar src={user.avatarUrl} size={40} name={user.name} />
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

					<PosterCardsLayout posters={posters} />
				</VStack>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={98}
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
							hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
						>
							<Icon name="Clapperboard" color="primary-9" size={24} />
						</Link>

						<Link
							href={{
								pathname: "/post/create/posters-picker/[type]",
								params: { type: "tvShow" },
							}}
							hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
