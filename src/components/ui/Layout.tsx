import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/styles/themes";

export const Layout = ({ children }: { children: ReactNode }) => {
	const { colors } = useTheme<Theme>();

	return (
		<SafeAreaView style={{ backgroundColor: colors.mainBackground }}>
			{children}
		</SafeAreaView>
	);
};
