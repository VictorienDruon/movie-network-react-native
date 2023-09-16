import { forwardRef, useCallback, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { CountryData } from "emoji-flags";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/theme";
import { ProvidersByCategory } from "@/libs/axios/types/Providers";
import { VStack } from "@/components/ui";
import ProvidersCategory from "../components/ProvidersCategory";

interface ProvidersProps {
	region: CountryData;
	providers: ProvidersByCategory;
}

export const ProvidersBottomSheet = forwardRef(
	(
		{ region, providers }: ProvidersProps,
		ref: React.MutableRefObject<BottomSheet>
	) => {
		const { link, flatrate, buy, rent } = providers;
		const snapPoints = useMemo(() => ["50%"], []);
		const { colors } = useTheme<Theme>();

		const handleSheetChanges = useCallback((index: number) => {
			console.log("handleSheetChanges", index);
		}, []);

		return (
			<BottomSheet
				ref={ref}
				index={-1}
				enablePanDownToClose
				snapPoints={snapPoints}
				backgroundStyle={{ backgroundColor: colors["neutral-1"] }}
				handleIndicatorStyle={{ backgroundColor: colors["neutral-6"] }}
				onChange={handleSheetChanges}
			>
				<VStack pt={16} space={16}>
					{flatrate && (
						<ProvidersCategory category="Streaming" providers={flatrate} />
					)}

					{buy && <ProvidersCategory category="Buy" providers={buy} />}

					{rent && <ProvidersCategory category="Rent" providers={rent} />}
				</VStack>
			</BottomSheet>
		);
	}
);
