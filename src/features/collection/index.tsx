import { Body, Title, VStack, Image, Link } from "@/components/ui";

export interface Collection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export const Collection = ({ collection }: { collection: Collection }) => {
	const { id, name, backdrop_path } = collection;

	return (
		<VStack px={16} space={8}>
			<Title>Collection</Title>
			<VStack width={175} space={2}>
				<Link
					href={{
						pathname: "/collection/[id]",
						params: { id },
					}}
				>
					<Image
						src={`${process.env.EXPO_PUBLIC_IMAGE_URL}/w300${backdrop_path}`}
						alt={name}
						width={175}
						aspectRatio={16 / 9}
						borderRadius="sm"
						borderWidth={1}
						borderColor="neutral-6"
					/>
				</Link>
				<Body
					fontSize={13}
					textAlign="center"
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{name}
				</Body>
			</VStack>
		</VStack>
	);
};
