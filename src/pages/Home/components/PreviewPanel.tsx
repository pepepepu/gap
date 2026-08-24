import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../components";

const PanelContainer = styled.main`
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

interface CanvasAreaProps {
  $orientation?: "vertical" | "horizontal";
  $order?: "text-first" | "image-first";
}

const CanvasArea = styled.div<CanvasAreaProps>`
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: ${({ $orientation, $order }) => {
    if ($orientation === "horizontal") {
      return $order === "text-first" ? "row" : "row-reverse";
    }
    return $order === "text-first" ? "column" : "column-reverse";
  }};
`;

const TextSection = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 2rem;
  overflow: hidden;
`;

const ImageSection = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  overflow: hidden;
`;

export const PreviewPanel: React.FC = () => {
  return (
    <PanelContainer>
      <Box display="flex" flexDirection="column" alignItems="center" gap="2rem">
        <CanvasArea $orientation="vertical" $order="text-first">
          <TextSection>
            <Text color="white" size="24px" weight="bold" align="center">
              A ( ) vida ( ) é ( ) bela
            </Text>
          </TextSection>
          <ImageSection>
            <Text color="textDark" size="14px" align="center">
              A imagem importada e os recortes vazados ficarão aqui.
            </Text>
          </ImageSection>
        </CanvasArea>
      </Box>
    </PanelContainer>
  );
};
