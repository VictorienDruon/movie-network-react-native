import { useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface Attachment {
	type: "movie" | "tv";
	id: number;
	title: string;
	poster_path: string;
}

interface PostCreationContext {
	attachments: Attachment[];
	isSelected: (id: number) => boolean;
	toggle: (attachment: Attachment) => void;
	push: () => void;
}

const PostCreationContext = createContext<PostCreationContext>(null);

export const PostCreationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [attachments, setAttachments] = useState<Attachment[]>([]);
	const [attachmentsId, setAttachmentsId] = useState<Set<number>>(new Set());

	const [tempAttachments, setTempAttachments] = useState(attachments);
	const [tempAttachmentsId, setTempAttachmentsId] = useState(attachmentsId);

	const segments = useSegments();

	useEffect(() => {
		setTempAttachments(attachments);
		setTempAttachmentsId(attachmentsId);
	}, [segments]);

	const isSelected = (id: number) => tempAttachmentsId.has(id);

	const toggle = (attachment: Attachment) => {
		if (isSelected(attachment.id)) {
			setTempAttachments((prev) =>
				prev.filter((item) => item.id !== attachment.id)
			);
			setTempAttachmentsId((prev) => {
				const newSet = new Set(prev);
				newSet.delete(attachment.id);
				return newSet;
			});
		} else {
			setTempAttachments((prev) => [...prev, attachment]);
			setTempAttachmentsId((prev) => {
				const newSet = new Set(prev);
				newSet.add(attachment.id);
				return newSet;
			});
		}
	};

	const push = () => {
		setAttachments(tempAttachments);
		setAttachmentsId(tempAttachmentsId);
	};

	return (
		<PostCreationContext.Provider
			value={{ attachments, isSelected, toggle, push }}
		>
			{children}
		</PostCreationContext.Provider>
	);
};

export const usePostCreation = () => useContext(PostCreationContext);
