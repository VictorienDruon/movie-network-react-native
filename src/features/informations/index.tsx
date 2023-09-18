import { formatMoney } from "@/utils/numbers";
import { pluralize } from "@/utils/texts";
import { VStack, Title } from "@/components/ui";
import Information from "./components/Information";

export interface Informations {
	companies?: string[];
	countries?: string[];
	created_by?: string[];
	release_date?: string;
	languages?: string[];
	budget?: number;
	revenue?: number;
	last_episode_to_air?: {
		season_number: number;
		episode_number: number;
		name: string;
	};
	in_production?: boolean;
}

interface InformationsProps {
	type: string;
	informations: Informations;
}

export const Informations = ({ type, informations }: InformationsProps) => {
	const {
		companies,
		countries,
		created_by,
		release_date,
		languages,
		budget,
		revenue,
		last_episode_to_air,
		in_production,
	} = informations;

	return (
		<VStack px={16} space={4}>
			<Title>Informations</Title>
			{companies?.length > 0 && (
				<Information
					title={pluralize(companies.length, "Studio")}
					content={companies.join(", ")}
				/>
			)}

			{countries?.length > 0 && (
				<Information
					title={pluralize(countries.length, "Region")}
					content={countries.join(", ")}
				/>
			)}

			{created_by?.length > 0 && (
				<Information title="Created By" content={created_by.join(", ")} />
			)}

			{release_date?.length > 0 && (
				<Information
					title={type === "movie" ? "Release Date" : "First Air Date"}
					content={release_date}
				/>
			)}

			{languages?.length > 0 && (
				<Information
					title={pluralize(languages.length, "Language")}
					content={languages.join(", ")}
				/>
			)}

			{budget > 0 && (
				<Information title="Budget" content={formatMoney(budget)} />
			)}
			{revenue > 0 && (
				<Information title="Revenue" content={formatMoney(revenue)} />
			)}

			{last_episode_to_air && (
				<Information
					title="Last Episode to Air"
					content={`S${last_episode_to_air.season_number}E${last_episode_to_air.episode_number} - ${last_episode_to_air.name}`}
				/>
			)}

			{type === "tv" && (
				<Information
					title="In Production"
					content={in_production ? "Yes" : "No"}
				/>
			)}
		</VStack>
	);
};
