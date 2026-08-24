import styled from "styled-components";

interface BoxProps {
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const Box = styled.div<BoxProps>`
  display: ${({ display }) => display || "block"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  gap: ${({ gap }) => gap || "0"};
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
`;

export default Box;
