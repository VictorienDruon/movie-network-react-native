import { TouchableOpacity } from "react-native";
import { Href } from "expo-router/build/link/href";
import { Box, BoxProps } from "./box";
import { Icon, IconProps } from "./icon";
import { Link } from "./link";

type RoundButtonVariant = "primary" | "secondary" | "outline";
type RoundButtonSize = "sm" | "md" | "lg";

interface RoundButtonProps extends BoxProps {
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	icon: IconProps["name"];
	fill?: boolean;
	href?: Href;
	onPress?: () => void;
	disabled?: boolean;
}

export const RoundButton = ({
	variant = "primary",
	size = "sm",
	icon,
	fill = false,
	href,
	disabled = false,
	onPress,
	...props
}: RoundButtonProps) => {
	if (href)
		return (
			<Link href={href}>
				<InnerRoundButton
					variant={variant}
					size={size}
					icon={icon}
					fill={fill}
					{...props}
				/>
			</Link>
		);

	return (
		<TouchableOpacity disabled={disabled} onPress={onPress}>
			<InnerRoundButton
				variant={variant}
				size={size}
				icon={icon}
				fill={fill}
				{...props}
			/>
		</TouchableOpacity>
	);
};

const InnerRoundButton = ({
	variant,
	size,
	icon,
	fill,
	...props
}: RoundButtonProps) => (
	<Box
		justifyContent="center"
		alignItems="center"
		borderRadius="full"
		{...boxSizes[size]}
		{...boxVariants[variant]}
		{...props}
	>
		<Icon
			name={icon}
			size={iconSizes[size]}
			color={iconVariants[variant]}
			fill={fill}
		/>
	</Box>
);

const boxSizes: { [key in RoundButtonSize]: BoxProps } = {
	lg: {
		width: 56,
		height: 56,
	},
	md: {
		width: 48,
		height: 48,
	},
	sm: {
		width: 40,
		height: 40,
	},
};

const boxVariants: { [key in RoundButtonVariant]: BoxProps } = {
	primary: {
		bg: "primary-9",
	},
	outline: {
		bg: "primary-3",
	},
	secondary: {
		bg: "neutral-3",
	},
};

const iconSizes: { [key in RoundButtonSize]: IconProps["size"] } = {
	lg: 24,
	md: 20,
	sm: 16,
};

const iconVariants: { [key in RoundButtonVariant]: IconProps["color"] } = {
	primary: "white",

	outline: "primary-9",

	secondary: "neutral-9",
};
