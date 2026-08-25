import React from "react";
import styled from "styled-components";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  objectFit?: string;
  borderRadius?: string;
}

const StyledImage = styled.img<any>`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "auto"};
  object-fit: ${({ $objectFit }) => $objectFit || "cover"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "0"};
  display: block;
`;

const Image: React.FC<ImageProps> = ({
  width,
  height,
  objectFit,
  borderRadius,
  ...props
}) => {
  return (
    <StyledImage
      $width={width}
      $height={height}
      $objectFit={objectFit}
      $borderRadius={borderRadius}
      {...props}
    />
  );
};

export default Image;
