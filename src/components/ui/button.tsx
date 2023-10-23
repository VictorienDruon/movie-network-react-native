import { TouchableOpacity } from "react-native";
import { HStack, StackProps } from "./stack";
import { ButtonText, TextProps } from "./texts";
import { Icon, IconProps } from "./icon";
import { BoxProps } from "./box";

type ButtonVariant = "primary" | "outline" | "secondary" | "secondaryOutline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<BoxProps, "children" | "onPress"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: IconProps["name"];
	rightIcon?: IconProps["name"];
	fillIcon?: boolean;
	disabled?: boolean;
	onPress?: () => void;
	children?: string;
}

export const Button = ({
	variant = "primary",
	size = "md",
	leftIcon,
	rightIcon,
	fillIcon = false,
	disabled,
	onPress,
	children,
	...props
}: ButtonProps) => (
	<TouchableOpacity disabled={disabled} onPress={onPress}>
		<HStack
			alignItems="center"
			justifyContent="center"
			opacity={disabled ? 0.5 : 1}
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
					fill={fillIcon}
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
					fill={fillIcon}
				/>
			)}
		</HStack>
	</TouchableOpacity>
);

const boxVariants: { [key in ButtonVariant]: BoxProps } = {
	primary: {
		bg: "primary-9",
		borderRadius: "lg",
	},
	outline: {
		borderColor: "primary-9",
		borderWidth: 1,
		borderRadius: "lg",
	},
	secondary: {
		bg: "neutral-3",
		borderRadius: "lg",
	},
	secondaryOutline: {
		borderColor: "neutral-6",
		borderWidth: 1,
		borderRadius: "lg",
	},
};

const boxSizes: { [key in ButtonSize]: StackProps } = {
	lg: {
		height: 32,
		px: 20,
		space: 6,
	},
	md: {
		height: 30,
		px: 12,
		space: 4,
	},
	sm: {
		height: 28,
		px: 8,
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
	secondary: {
		color: "neutral-11",
	},
	secondaryOutline: {
		color: "neutral-11",
	},
};

const textSizes: { [key in ButtonSize]: TextProps } = {
	lg: {
		fontSize: 16,
		lineHeight: 20,
	},
	md: {
		fontSize: 16,
		lineHeight: 20,
	},
	sm: {
		fontSize: 14,
		lineHeight: 18,
	},
};

const iconSizes: { [key in ButtonSize]: IconProps["size"] } = {
	lg: 20,
	md: 18,
	sm: 16,
};
