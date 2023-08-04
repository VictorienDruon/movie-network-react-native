import { ReactNode, createContext, useContext } from "react";
import useSessionLoader from "./hooks/useSessionLoader";
import useProtectedRoute from "./hooks/useProtectedRoute";

interface SessionContext {
	isSessionLoaded: boolean;
}
interface SessionProviderProps {
	children: ReactNode;
}

const SessionContext = createContext<SessionContext>(null);

export const SessionProvider = ({ children }: SessionProviderProps) => {
	const { isSessionLoaded, session } = useSessionLoader();
	useProtectedRoute(isSessionLoaded, session);

	return (
		<SessionContext.Provider value={{ isSessionLoaded }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => useContext(SessionContext);
