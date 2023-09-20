import {
	Box,
	Avatar,
	Body,
	Metadata,
	BoxProps,
	Icon,
	VStack,
	Link,
} from "@/components/ui";

export interface CreditMember {
	id: number;
	name: string;
	role: string;
	profile_path: string;
}

interface CreditMemberProps extends Omit<BoxProps, "id"> {
	member: CreditMember;
}

export const CreditMember = ({
	member: person,
	...props
}: CreditMemberProps) => {
	const { id, name, role, profile_path } = person;
	return (
		<VStack alignItems="center" width={96} space={0} {...props}>
			<Link
				href={{
					pathname: "/person/[id]",
					params: { id },
				}}
			>
				{profile_path ? (
					<Avatar
						src={`${process.env.EXPO_PUBLIC_IMAGE_URL}/w185${profile_path}`}
						size={80}
						alt={`${name} avatar`}
					/>
				) : (
					<Box
						justifyContent="center"
						alignItems="center"
						width={80}
						height={80}
						bg="neutral-3"
						borderRadius="full"
						borderWidth={1}
						borderColor="neutral-6"
					>
						<Icon name="User2" size={40} strokeWidth={1} color="neutral-9" />
					</Box>
				)}
			</Link>
			<Body
				fontSize={13}
				textAlign="center"
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{name}
			</Body>
			{role && (
				<Metadata textAlign="center" numberOfLines={1} ellipsizeMode="tail">
					{role}
				</Metadata>
			)}
		</VStack>
	);
};
