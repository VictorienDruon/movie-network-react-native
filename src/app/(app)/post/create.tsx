import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { PostSchema } from "@/utils/schema";
import { useSession } from "@/providers/session";
import {
	Avatar,
	Box,
	Button,
	HStack,
	Icon,
	Metadata,
	Title,
	VStack,
} from "@/components/ui";

const CreatePostScreen = () => {
	const { user } = useSession();
	const { colors } = useTheme<Theme>();

	const { control, formState, handleSubmit, reset } = useForm<PostSchema>({
		resolver: zodResolver(PostSchema),
	});

	const handlePostSubmit = handleSubmit(async ({ content }: PostSchema) => {
		console.log(content);
		reset();
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

						<Box
							px={8}
							py={4}
							borderWidth={1}
							borderColor="primary-9"
							borderRadius="md"
						>
							<Metadata color="primary-9">Public</Metadata>
						</Box>
					</HStack>

					<Controller
						name="content"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder="Watched something great lately?!"
								placeholderTextColor={colors["neutral-11"]}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								multiline
								style={{ fontSize: 18, color: colors["neutral-12"] }}
							/>
						)}
					/>
				</VStack>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={96}
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
						variant="primary"
						size="sm"
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
