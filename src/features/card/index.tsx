import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
	VStack,
	Image,
	Body,
	BoxProps,
	Box,
	Icon,
	Skeleton,
} from "@/components/ui";

interface CardProps extends Omit<BoxProps, "id"> {
	title: string;
	poster_path: string;
	isSelected?: boolean;
	onPress: () => void;
}

const Card = ({
	title,
	poster_path,
	isSelected,
	onPress,
	...props
}: CardProps) => {
	const [isLoading, setIsLoading] = useState(poster_path ? true : false);

	return (
		<VStack
			position="relative"
			alignItems="center"
			width={100}
			space={2}
			{...props}
		>
			<TouchableOpacity onPress={onPress}>
				{poster_path ? (
					<Image
						src={`https://image.tmdb.org/t/p/w185${poster_path}`}
						alt={`${title} poster`}
						width={100}
						aspectRatio={5 / 7}
						borderRadius="sm"
						onLoadEnd={() => setIsLoading(false)}
					/>
				) : (
					<Box
						justifyContent="center"
						alignItems="center"
						width={100}
						aspectRatio={5 / 7}
						bg="neutral-5"
						borderRadius="sm"
					>
						<Icon name="HelpCircle" size={28} color="neutral-9" />
					</Box>
				)}

				{isSelected && (
					<Box
						position="absolute"
						justifyContent="center"
						alignItems="center"
						width={100}
						aspectRatio={5 / 7}
					>
						<Box
							width="100%"
							height="100%"
							backgroundColor="primary-5"
							opacity={0.6}
							borderRadius="sm"
						/>
						<Box
							position="absolute"
							justifyContent="center"
							alignItems="center"
							width={28}
							height={28}
							bg="primary-9"
							borderRadius="full"
							borderWidth={1}
							borderColor="white"
						>
							<Icon name="Check" size={20} color="white" />
						</Box>
					</Box>
				)}

				{isLoading && (
					<Skeleton
						position="absolute"
						width={100}
						aspectRatio={5 / 7}
						borderRadius="sm"
					/>
				)}
			</TouchableOpacity>

			<Body
				fontSize={13}
				textAlign="center"
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{title}
			</Body>
		</VStack>
	);
};

export default Card;
