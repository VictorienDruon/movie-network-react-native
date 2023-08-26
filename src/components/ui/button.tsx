import { TouchableOpacity } from "react-native";
import { HStack, StackProps } from "./stack";
import { ButtonText, TextProps } from "./texts";
import { Icon, IconProps } from "./icon";
import { BoxProps } from "./box";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<BoxProps, "children" | "onPress"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: IconProps["name"];
	rightIcon?: IconProps["name"];
	disabled?: boolean;
	onPress?: () => void;
	children?: string;
}

export const Button = ({
	variant = "primary",
	size = "md",
	leftIcon,
	rightIcon,
	disabled,
	onPress,
	children,
	...props
}: ButtonProps) => (
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

			{children && (
				<ButtonText
					textAlign="center"
					{...textSizes[size]}
					{...textVariants[variant]}
				>
					{children}
				</ButtonText>
			)}

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

const boxVariants: { [key in ButtonVariant]: BoxProps } = {
	primary: {
		bg: "primary-9",
		borderRadius: "full",
	},
	outline: {
		borderColor: "primary-9",
		borderWidth: 1,
		borderRadius: "full",
	},
	ghost: {
		bg: "neutral-3",
		borderRadius: "full",
	},
};

const boxSizes: { [key in ButtonSize]: StackProps } = {
	lg: {
		px: 20,
		py: 8,
		space: 6,
	},
	md: {
		px: 12,
		py: 6,
		space: 4,
	},
	sm: {
		px: 8,
		py: 4,
		space: 4,
	},
};

const textVariants: { [key in ButtonVariant]: TextProps } = {
	primary: {
		color: "white",
	},
	outline: {
		color: "primary-9",
	},
	ghost: {
		color: "neutral-11",
	},
};

const textSizes: { [key in ButtonSize]: TextProps } = {
	lg: {
		fontSize: 16,
	},
	md: {
		fontSize: 16,
	},
	sm: {
		fontSize: 14,
	},
};

const iconSizes: { [key in ButtonSize]: IconProps["size"] } = {
	lg: 20,
	md: 18,
	sm: 16,
};
