import { ReactNode, createContext, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import type { Provider, Session } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { useSessionLoader, useProtectedRoute } from "./hooks";

interface AuthContext {
	session: Session | null;
	isSessionLoaded: boolean;
	signIn: (provider: Provider, redirectTo: string) => Promise<void>;
	signOut: () => Promise<void>;
}
interface AuthProviderProps {
	children: ReactNode;
}

const signIn = async (provider: Provider, redirectTo: string) => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: { redirectTo },
	});
	if (error) throw new Error("Error getting auth url: " + error.message);
	const res = await WebBrowser.openAuthSessionAsync(data.url);
	if (res.type === "success") {
		const params = new URLSearchParams(res.url.split("#")[1]);
		const access_token = params.get("access_token");
		const refresh_token = params.get("refresh_token");
		if (!access_token || !refresh_token)
			throw new Error("Error retrieving tokens in url");
		const { error } = await supabase.auth.setSession({
			access_token,
			refresh_token,
		});
		if (error) throw new Error("Error setting auth session: " + error.message);
	} else throw new Error("Authentication failed: " + res.type);
};

const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error("Error signing out: " + error.message);
};

const AuthContext = createContext<AuthContext>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { isSessionLoaded, session } = useSessionLoader();
	useProtectedRoute(isSessionLoaded, session);

	return (
		<AuthContext.Provider value={{ isSessionLoaded, session, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
