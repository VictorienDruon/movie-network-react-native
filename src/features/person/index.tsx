import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Box, Avatar, Body, Metadata, BoxProps } from "@/components/ui";

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
				<Avatar
					src={`https://image.tmdb.org/t/p/w185${profile_path}`}
					size={80}
					alt={`${name} avatar`}
				/>
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
