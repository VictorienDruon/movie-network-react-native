import { TextInput, TextInputProps } from "react-native";
import {
	typography,
	TextProps,
	color,
	ColorProps,
	backgroundColor,
	BackgroundColorProps,
	layout,
	LayoutProps,
	composeRestyleFunctions,
	useRestyle,
	useTheme,
} from "@shopify/restyle";
import { Theme } from "@/styles/theme";

type RestyleProps = TextProps<Theme> &
	ColorProps<Theme> &
	BackgroundColorProps<Theme> &
	LayoutProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
	typography,
	color,
	backgroundColor,
	layout,
]);

type InputProps = RestyleProps &
	TextInputProps & {
		placeholderTextColor?: keyof Theme["colors"];
	};

export const Input = ({
	placeholderTextColor = "neutral-11",
	...rest
}: InputProps) => {
	const { colors } = useTheme<Theme>();
	const props = useRestyle(restyleFunctions, rest);

	return (
		<TextInput
			placeholderTextColor={colors[placeholderTextColor]}
			{...props}
		></TextInput>
	);
};
