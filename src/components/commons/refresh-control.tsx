import { useCallback, useState } from "react";
import { RefreshControl as RefreshControlRN } from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";

export const RefreshControl = ({
	refetch,
}: {
	refetch: () => Promise<QueryObserverResult>;
}) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}, []);

	return <RefreshControlRN refreshing={refreshing} onRefresh={handleRefresh} />;
};

export default RefreshControl;