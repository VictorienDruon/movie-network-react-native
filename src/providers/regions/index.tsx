import { createContext, useContext, useState } from "react";
import { getLocales } from "expo-localization";
import RegionList, {
	Country as Region,
} from "country-list-with-dial-code-and-flag";

interface RegionsContext {
	availableRegions: Region[];
	selectedRegion: Region;
	initRegions: (regionsCode: string[]) => void;
	changeRegion: (region: Region) => void;
}

const RegionsContext = createContext<RegionsContext>(null);

export const RegionsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [availableRegions, setAvailableRegions] = useState<Region[]>(null);
	const [selectedRegion, setSelectedRegion] = useState<Region>(null);

	const initRegions = (regionsCode: string[]) => {
		const { regionCode: userRegion } = getLocales()[0];

		const newAvailableRegions = regionsCode.map((regionCode) =>
			RegionList.findOneByCountryCode(regionCode)
		);
		const newSelectedRegion = regionsCode.includes(userRegion)
			? RegionList.findOneByCountryCode(userRegion)
			: newAvailableRegions[0];

		setAvailableRegions(newAvailableRegions);
		setSelectedRegion(newSelectedRegion);
	};

	const changeRegion = (region: Region) => setSelectedRegion(region);

	return (
		<RegionsContext.Provider
			value={{
				availableRegions,
				selectedRegion,
				initRegions,
				changeRegion,
			}}
		>
			{children}
		</RegionsContext.Provider>
	);
};

export const useRegions = () => useContext(RegionsContext);
