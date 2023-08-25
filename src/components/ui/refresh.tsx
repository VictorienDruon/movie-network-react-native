import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";

export const Refresh = ({
	refetch,
}: {
	refetch: () => Promise<QueryObserverResult>;
}) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}, []);

	return (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={handleRefresh}
		></RefreshControl>
	);
};

export default Refresh;
