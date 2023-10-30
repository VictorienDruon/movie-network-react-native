import { useErrorBoundary } from "react-error-boundary";
import { VStack } from "../ui/stack";
import { Heading, Title } from "../ui/texts";
import { Button } from "../ui/button";

interface ErrorStateProps {
	retry?: () => void;
}

export const ErrorState = ({ retry }: ErrorStateProps) => {
	const { resetBoundary } = useErrorBoundary();

	return (
		<VStack flex={1} justifyContent="space-around" space={28} px={32}>
			<VStack alignItems="center" space={16}>
				<Heading>Something went wrong</Heading>
				<Title color="neutral-11" textAlign="center">
					An error has occurred. Please try again later.
				</Title>
			</VStack>
			<Button variant="outline" onPress={retry || resetBoundary}>
				Try Again?
			</Button>
		</VStack>
	);
};
