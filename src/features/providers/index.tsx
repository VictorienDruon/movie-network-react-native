import Category from "./components/Category";
import { Provider } from "./components/Provider";
import { VStack } from "@/components/ui";

export interface Providers {
	link: string;
	flatrate: Provider[];
	buy: Provider[];
	rent: Provider[];
}

export const Providers = ({ providers }: { providers: Providers }) => {
	const { link, flatrate, buy, rent } = providers;

	return (
		<VStack space={16}>
			{flatrate && (
				<Category title="Streaming" link={link} providers={flatrate} />
			)}

			{buy && <Category title="Buy" link={link} providers={buy} />}

			{rent && <Category title="Rent" link={link} providers={rent} />}
		</VStack>
	);
};
