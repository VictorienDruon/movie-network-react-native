import { ReactNode, createContext, useContext } from "react";
import { useSessionLoader } from "./hooks/useSessionLoader";
import { useProtectedRoute } from "./hooks/useProtectedRoute";
import { Session } from "@supabase/supabase-js";

interface SessionContext {
	isSessionLoaded: boolean;
	session: Session | null;
}

const SessionContext = createContext<SessionContext>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const { isSessionLoaded, session } = useSessionLoader();
	useProtectedRoute(isSessionLoaded, session);

	return (
		<SessionContext.Provider value={{ isSessionLoaded, session }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => useContext(SessionContext);
