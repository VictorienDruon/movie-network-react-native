import { createContext, useContext, useEffect, useState } from "react";
import { useSegments } from "expo-router";
import { Poster } from "@/features/posters/components/Poster";

interface PostersContext {
	posters: Poster[];
	isSelected: (id: number) => boolean;
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
	const [postersId, setPostersId] = useState<Set<number>>(new Set());

	const [draftPosters, setDraftPosters] = useState(posters);
	const [draftPostersId, setDraftPostersId] = useState(postersId);

	const segments = useSegments();

	useEffect(() => {
		setDraftPosters(posters);
		setDraftPostersId(postersId);
	}, [segments]);

	const isSelected = (id: number) => draftPostersId.has(id);

	const toggle = (attachment: Poster) => {
		if (isSelected(attachment.id)) {
			setDraftPosters((prev) =>
				prev.filter((item) => item.id !== attachment.id)
			);
			setDraftPostersId((prev) => {
				const newSet = new Set(prev);
				newSet.delete(attachment.id);
				return newSet;
			});
		} else if (draftPosters.length < 30) {
			setDraftPosters((prev) => [...prev, attachment]);
			setDraftPostersId((prev) => {
				const newSet = new Set(prev);
				newSet.add(attachment.id);
				return newSet;
			});
		} else {
			alert("You can only attach 30 posters per post.");
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
