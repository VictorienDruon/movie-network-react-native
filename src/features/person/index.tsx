import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Box, Avatar, Body, Metadata, BoxProps, Icon } from "@/components/ui";

interface PersonProps extends Omit<BoxProps, "id"> {
	id: number;
	name: string;
	character?: string;
	job?: string;
	profile_path: string;
}

const Person = ({
	id,
	name,
	character,
	job,
	profile_path,
	...props
}: PersonProps) => (
	<Box alignItems="center" width={96} {...props}>
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
		{(character || job) && (
			<Metadata textAlign="center" numberOfLines={1} ellipsizeMode="tail">
				{character || job}
			</Metadata>
		)}
	</Box>
);

export default Person;
