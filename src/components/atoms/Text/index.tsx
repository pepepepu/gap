import styled from "styled-components";
import type { DefaultTheme } from "styled-components";

interface TextProps {
  size?: string;
  weight?: string;
  color?: keyof DefaultTheme["colors"];
  align?: string;
  isHeading?: boolean;
  margin?: string;
}

const Text = styled.p<TextProps>`
  font-family: ${({ theme, isHeading }) =>
    isHeading ? theme.fonts.heading : theme.fonts.body};
  font-size: ${({ size }) => size || "1rem"};
  font-weight: ${({ weight, isHeading }) =>
    weight ? weight : isHeading ? "bold" : "normal"};
  color: ${({ theme, color }) => (color ? theme.colors[color] : "inherit")};
  text-align: ${({ align }) => align || "left"};
  margin: ${({ margin }) => margin || "0"};
`;

export default Text;
