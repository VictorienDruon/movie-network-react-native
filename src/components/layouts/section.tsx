import { VStack, TextProps, RawText, BoxProps } from "../ui";

type SectionSize = "sm" | "md" | "lg";

interface SectionProps {
	title?: string;
	size?: SectionSize;
	space?: BoxProps["padding"];
	flatlist?: boolean;
	children: React.ReactNode;
}

export const Section = ({
	title,
	size = "md",
	space = 8,
	flatlist = false,
	children,
}: SectionProps) => {
	return (
		<VStack space={space} px={flatlist ? 0 : 16}>
			{title && (
				<RawText px={flatlist ? 16 : 0} {...textVariants[size]}>
					{title}
				</RawText>
			)}
			{children}
		</VStack>
	);
};

const textVariants: { [key in SectionSize]: TextProps } = {
	lg: { variant: "header" },
	md: { variant: "subheader" },
	sm: { variant: "title" },
};
