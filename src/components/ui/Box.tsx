import { ViewProps } from "react-native";
import { createBox } from "@shopify/restyle";
import { Theme } from "@/styles/theme";

export const Box = createBox<Theme, ViewProps>();

export type BoxProps = React.ComponentProps<typeof Box>;
