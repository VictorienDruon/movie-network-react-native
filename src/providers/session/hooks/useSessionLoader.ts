import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";

export interface User {
	id: string;
	name: string;
	avatar_url: string;
}

export const useSessionLoader = () => {
	const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setIsSessionLoaded(true);
		});

		supabase.auth.onAuthStateChange((_event, session) => setSession(session));
	}, []);

	useEffect(() => {
		if (session) {
			const user = {
				id: session.user.id,
				name: session.user.user_metadata.full_name,
				avatar_url: session.user.user_metadata.avatar_url,
			};
			setUser(user);
		}
	}, [session]);

	return { isSessionLoaded, session, user };
};
