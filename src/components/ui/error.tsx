import { QueryObserverResult } from "@tanstack/react-query";
import { VStack } from "./stack";
import { Heading, Title } from "./texts";
import { Button } from "./button";

interface ErrorProps {
	retry: () => Promise<QueryObserverResult>;
}

export const Error = ({ retry }: ErrorProps) => (
	<VStack flex={1} justifyContent="space-between" space={28} px={28} py={64}>
		<VStack alignItems="center" space={16}>
			<Heading>Something went wrong</Heading>
			<Title color="neutral-11" textAlign="center">
				An error has occurred. Please try again later.
			</Title>
		</VStack>
		<Button variant="outline" onPress={retry}>
			Try Again?
		</Button>
	</VStack>
);
