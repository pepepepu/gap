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

const CanvasArea = styled.div`
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const BottomSection = styled.div`
  flex: 1;
  background-color: #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewPanel: React.FC = () => {
  return (
    <PanelContainer>
      <Box display="flex" flexDirection="column" alignItems="center" gap="2rem">
        <CanvasArea>
          <TopSection>
            <Text color="white" size="24px" weight="bold" align="center">
              A ( ) vida ( ) é ( ) bela
            </Text>
          </TopSection>
          <BottomSection>
            <Text color="textDark" size="14px">
              A imagem importada e os recortes vazados ficarão aqui.
            </Text>
          </BottomSection>
        </CanvasArea>
      </Box>
    </PanelContainer>
  );
};
