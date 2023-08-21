import { TouchableOpacity } from "react-native";
import { HStack, StackProps } from "./stack";
import { ButtonText, type TextProps } from "./texts";
import { Icon, IconProps } from "./icon";

import { type BoxProps } from "./box";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<BoxProps, "children" | "onPress"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: IconProps["name"];
	rightIcon?: IconProps["name"];
	disabled?: boolean;
	onPress?: () => void;
	children: string;
}

export const Button = ({
	variant = "secondary",
	size = "md",
	leftIcon,
	rightIcon,
	disabled,
	onPress,
	children,
	...props
}: ButtonProps) => {
	return (
		<TouchableOpacity disabled={disabled} onPress={onPress}>
			<HStack
				alignItems="center"
				justifyContent="center"
				{...boxSizes[size]}
				{...boxVariants[variant]}
				{...props}
			>
				{leftIcon && (
					<Icon
						name={leftIcon}
						size={iconSizes[size]}
						color={textVariants[variant].color}
						strokeWidth={2}
					/>
				)}

				<ButtonText
					textAlign="center"
					{...textSizes[size]}
					{...textVariants[variant]}
				>
					{children}
				</ButtonText>

				{rightIcon && (
					<Icon
						name={rightIcon}
						size={iconSizes[size]}
						color={textVariants[variant].color}
						strokeWidth={2}
					/>
				)}
			</HStack>
		</TouchableOpacity>
	);
};

const boxVariants: { [key in ButtonVariant]: BoxProps } = {
	primary: {
		bg: "primary-10",
		borderRadius: "full",
	},
	secondary: {
		bg: "neutral-3",
		borderRadius: "full",
	},
	link: {
		px: 0,
	},
};

const boxSizes: { [key in ButtonSize]: StackProps } = {
	lg: {
		px: 24,
		py: 12,
		space: 8,
	},
	md: {
		px: 20,
		py: 10,
		space: 8,
	},
	sm: {
		px: 16,
		py: 8,
		space: 4,
	},
};

const textVariants: { [key in ButtonVariant]: TextProps } = {
	primary: {
		color: "white",
	},
	secondary: {
		color: "neutral-12",
	},
	link: {
		color: "primary-10",
	},
};

const textSizes: { [key in ButtonSize]: TextProps } = {
	lg: {
		fontSize: 18,
	},
	sm: {
		fontSize: 14,
	},
	md: {
		fontSize: 16,
	},
};

const iconSizes: { [key in ButtonSize]: IconProps["size"] } = {
	lg: 22,
	md: 20,
	sm: 16,
};
