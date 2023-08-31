import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
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
} from "@/components/ui";
import { Poster } from "@/features/poster";

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
							size="sm"
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

					<Box maxHeight={300} alignItems="center">
						{posters.length === 1 ? (
							<Poster poster={posters[0]} size="lg" />
						) : posters.length === 2 ? (
							<>
								<Poster
									poster={posters[0]}
									size="md"
									right="22%"
									height="75%"
									rotate="-3deg"
								/>
								<Poster
									poster={posters[1]}
									size="md"
									top="-50%"
									left="22%"
									height="75%"
									rotate="3deg"
								/>
							</>
						) : (
							posters.length === 3 && (
								<>
									<Poster
										poster={posters[0]}
										size="sm"
										right="25%"
										height="60%"
										rotate="-5deg"
									/>
									<Poster
										poster={posters[1]}
										size="sm"
										top="-50%"
										left="25%"
										height="60%"
										rotate="5deg"
									/>
									<Poster
										poster={posters[2]}
										size="sm"
										top="-80%"
										right="5%"
										height="60%"
									/>
								</>
							)
						)}
					</Box>
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
						<Link href="/(app)/post/create/movies" asChild>
							<TouchableOpacity>
								<Icon name="Clapperboard" color="primary-9" size={24} />
							</TouchableOpacity>
						</Link>

						<Link href="/(app)/post/create/shows" asChild>
							<TouchableOpacity>
								<Icon name="Tv" color="primary-9" size={24} />
							</TouchableOpacity>
						</Link>
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

export default CreateScreen;
