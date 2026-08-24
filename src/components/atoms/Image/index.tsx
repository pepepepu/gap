import styled from "styled-components";

interface ImageProps {
  width?: string;
  height?: string;
  objectFit?: string;
  borderRadius?: string;
}

const Image = styled.img<ImageProps>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
  object-fit: ${({ objectFit }) => objectFit || "cover"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
  display: block;
`;

export default Image;
