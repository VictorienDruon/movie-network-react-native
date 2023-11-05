import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/commons";
import { VStack } from "@/components/ui";
import AvatarEditor from "@/features/edit/AvatarEditor";
import NameEditor from "@/features/edit/NameEditor";

const EditScreen = () => {
	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<VStack p={32} space={32}>
				<AvatarEditor />

				<NameEditor />
			</VStack>
		</ErrorBoundary>
	);
};

export default EditScreen;
