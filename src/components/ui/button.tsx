import { TouchableOpacity } from "react-native";
import { Theme } from "@/styles/theme";
import { HStack, StackProps } from "./stack";
import { ButtonText, TextProps } from "./texts";
import { Icon, IconProps } from "./icon";
import { BoxProps } from "./box";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<BoxProps, "children" | "onPress"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	color?: keyof Theme["colors"];
	leftIcon?: IconProps["name"];
	rightIcon?: IconProps["name"];
	disabled?: boolean;
	onPress?: () => void;
	children: string;
}

export const Button = ({
	variant = "primary",
	size = "md",
	color = "primary-9",
	leftIcon,
	rightIcon,
	disabled,
	onPress,
	children,
	...props
}: ButtonProps) => {
	const boxVariants: { [key in ButtonVariant]: BoxProps } = {
		primary: {
			bg: color,
			borderRadius: "full",
		},
		outline: {
			borderColor: color,
			borderWidth: 1,
			borderRadius: "full",
		},
	};

	const boxSizes: { [key in ButtonSize]: StackProps } = {
		lg: {
			px: 20,
			py: 10,
			space: 8,
		},
		md: {
			px: 16,
			py: 8,
			space: 6,
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
			color,
		},
	};

	const textSizes: { [key in ButtonSize]: TextProps } = {
		lg: {
			fontSize: 18,
		},
		md: {
			fontSize: 16,
		},
		sm: {
			fontSize: 12,
		},
	};

	const iconSizes: { [key in ButtonSize]: IconProps["size"] } = {
		lg: 22,
		md: 20,
		sm: 16,
	};

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
