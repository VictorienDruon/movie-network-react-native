import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import { Session } from "@supabase/supabase-js";

const useProtectedRoute = (
	isSessionLoaded: boolean,
	session: Session | null
) => {
	const segments = useSegments();

	useEffect(() => {
		if (!isSessionLoaded) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (!session && !inAuthGroup) router.replace("/signin");
		else if (session && inAuthGroup) router.replace("/");
	}, [isSessionLoaded, session, segments]);
};

export default useProtectedRoute;
