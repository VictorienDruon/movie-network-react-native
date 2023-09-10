import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import {
	Box,
	Avatar,
	Body,
	Metadata,
	BoxProps,
	Icon,
	VStack,
} from "@/components/ui";

export interface Person {
	id: number;
	name: string;
	role?: string;
	profile_path: string;
}

interface PersonProps extends Omit<BoxProps, "id"> {
	person: Person;
}

export const Person = ({ person, ...props }: PersonProps) => {
	const { id, name, role, profile_path } = person;
	return (
		<VStack alignItems="center" width={96} space={0} {...props}>
			<Link
				href={{
					pathname: "/person/[id]",
					params: { id },
				}}
				asChild
			>
				<TouchableOpacity>
					{profile_path ? (
						<Avatar
							src={`https://image.tmdb.org/t/p/w185${profile_path}`}
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
				</TouchableOpacity>
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
