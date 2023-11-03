import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/commons";
import { VStack } from "@/components/ui";
import AvatarEditor from "@/features/edit/AvatarEditor";

const EditScreen = () => {
	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<VStack px={16} py={32} space={16}>
				<AvatarEditor />
			</VStack>
		</ErrorBoundary>
	);
};

export default EditScreen;
