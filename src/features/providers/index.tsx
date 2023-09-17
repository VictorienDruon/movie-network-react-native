import { Provider } from "./components/Provider";
import Category from "./components/Category";

export interface Providers {
	link: string;
	flatrate: Provider[];
	buy: Provider[];
	rent: Provider[];
}

export const Providers = ({ providers }: { providers: Providers }) => {
	const { link, flatrate, buy, rent } = providers;

	return (
		<>
			{flatrate && (
				<Category title="Streaming" link={link} providers={flatrate} />
			)}

			{buy && <Category title="Buy" link={link} providers={buy} />}

			{rent && <Category title="Rent" link={link} providers={rent} />}
		</>
	);
};
