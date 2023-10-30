import { useErrorBoundary } from "react-error-boundary";
import { Button, Heading, Title, VStack } from "../ui";

export const ErrorFallback = () => {
	const { resetBoundary } = useErrorBoundary();

	return (
		<VStack flex={1} justifyContent="space-around" space={28} px={32}>
			<VStack alignItems="center" space={16}>
				<Heading>Something went wrong</Heading>
				<Title color="neutral-11" textAlign="center">
					An error has occurred. Please try again later.
				</Title>
			</VStack>
			<Button variant="outline" onPress={resetBoundary}>
				Try Again?
			</Button>
		</VStack>
	);
};
