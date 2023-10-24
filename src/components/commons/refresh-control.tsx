import { useCallback, useState } from "react";
import {
	RefreshControl as RefreshControlRN,
	RefreshControlProps as RefreshControlPropsRN,
} from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";

interface RefreshControlProps
	extends Omit<RefreshControlPropsRN, "refreshing"> {
	refetch: () => Promise<QueryObserverResult>;
}

export const RefreshControl = ({ refetch, ...props }: RefreshControlProps) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}, []);

	return (
		<RefreshControlRN
			refreshing={refreshing}
			onRefresh={handleRefresh}
			{...props}
		/>
	);
};

export default RefreshControl;
