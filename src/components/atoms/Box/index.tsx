import React from "react";
import styled from "styled-components";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
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

const StyledBox = styled.div<any>`
  display: ${({ $display }) => $display || "block"};
  flex-direction: ${({ $flexDirection }) => $flexDirection || "row"};
  align-items: ${({ $alignItems }) => $alignItems || "stretch"};
  justify-content: ${({ $justifyContent }) => $justifyContent || "flex-start"};
  gap: ${({ $gap }) => $gap || "0"};
  padding: ${({ $padding }) => $padding || "0"};
  margin: ${({ $margin }) => $margin || "0"};
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "auto"};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "transparent"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "0"};
`;

const Box: React.FC<BoxProps> = ({
  display,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  padding,
  margin,
  width,
  height,
  backgroundColor,
  borderRadius,
  children,
  ...props
}) => {
  return (
    <StyledBox
      $display={display}
      $flexDirection={flexDirection}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $gap={gap}
      $padding={padding}
      $margin={margin}
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
      $borderRadius={borderRadius}
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export default Box;
