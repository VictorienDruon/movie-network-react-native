import { createContext, useContext, useEffect, useState } from "react";
import { useSegments } from "expo-router";
import { Poster } from "@/features/poster";

const MAX_POSTERS = 3;

interface PostersContext {
	posters: Poster[];
	isSelected: (id: number, type: string) => boolean;
	toggle: (attachment: Poster) => void;
	push: () => void;
}

const PostersContext = createContext<PostersContext>(null);

export const PostersProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [posters, setPosters] = useState<Poster[]>([]);
	const [postersId, setPostersId] = useState<Set<string>>(new Set());

	const [draftPosters, setDraftPosters] = useState(posters);
	const [draftPostersId, setDraftPostersId] = useState(postersId);

	const segments = useSegments();

	useEffect(() => {
		setDraftPosters(posters);
		setDraftPostersId(postersId);
	}, [segments]);

	const isSelected = (id: number, type: string) =>
		draftPostersId.has(id + type);

	const toggle = (attachment: Poster) => {
		if (isSelected(attachment.id, attachment.type)) {
			setDraftPosters((prev) =>
				prev.filter((item) => item.id !== attachment.id)
			);
			setDraftPostersId((prev) => {
				const newSet = new Set(prev);
				newSet.delete(attachment.id + attachment.type);
				return newSet;
			});
		} else if (draftPosters.length < MAX_POSTERS) {
			setDraftPosters((prev) => [...prev, attachment]);
			setDraftPostersId((prev) => {
				const newSet = new Set(prev);
				newSet.add(attachment.id + attachment.type);
				return newSet;
			});
		} else {
			alert(`You can attach a maximum of ${MAX_POSTERS} posters per post.`);
		}
	};

	const push = () => {
		setPosters(draftPosters);
		setPostersId(draftPostersId);
	};

	return (
		<PostersContext.Provider value={{ posters, isSelected, toggle, push }}>
			{children}
		</PostersContext.Provider>
	);
};

export const usePosters = () => useContext(PostersContext);
