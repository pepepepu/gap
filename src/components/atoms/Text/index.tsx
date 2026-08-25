import React from "react";
import styled from "styled-components";
import type { DefaultTheme } from "styled-components";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: string;
  weight?: string;
  color?: keyof DefaultTheme["colors"];
  align?: string;
  isHeading?: boolean;
  margin?: string;
}

const StyledText = styled.p<any>`
  font-family: ${({ theme, $isHeading }) =>
    $isHeading ? theme.fonts.heading : theme.fonts.body};
  font-size: ${({ $size }) => $size || "1rem"};
  font-weight: ${({ $weight, $isHeading }) =>
    $weight ? $weight : $isHeading ? "bold" : "normal"};
  color: ${({ theme, $color }) => ($color ? theme.colors[$color] : "inherit")};
  text-align: ${({ $align }) => $align || "left"};
  margin: ${({ $margin }) => $margin || "0"};
  padding: 0;
`;

const Text: React.FC<TextProps> = ({
  size,
  weight,
  color,
  align,
  isHeading,
  margin,
  children,
  ...props
}) => {
  return (
    <StyledText
      $size={size}
      $weight={weight}
      $color={color}
      $align={align}
      $isHeading={isHeading}
      $margin={margin}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;
