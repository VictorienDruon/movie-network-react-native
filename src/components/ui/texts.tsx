import { TextProps as RNTextProps } from "react-native";
import { createText } from "@shopify/restyle";
import { Theme } from "@/styles/theme";

export const RawText = createText<Theme, RNTextProps>();

export const Heading = (props: TextProps) => (
	<RawText variant="header" {...props} />
);

export const SubHeading = (props: TextProps) => (
	<RawText variant="subheader" {...props} />
);

export const Title = (props: TextProps) => (
	<RawText variant="title" {...props} />
);

export const Subtitle = (props: TextProps) => (
	<RawText variant="subtitle" {...props} />
);

export const Body = (props: TextProps) => <RawText variant="body" {...props} />;

export const Metadata = (props: TextProps) => (
	<RawText variant="metadata" {...props} />
);

export const ButtonText = (props: TextProps) => (
	<RawText variant="button" {...props} />
);

export type TextProps = React.ComponentProps<typeof RawText>;
