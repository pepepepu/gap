import React from "react";
import styled from "styled-components";
import { Box, Button, Image, Text } from "../../components";
import { PiBoxArrowUpFill, PiImage, PiTrashFill } from "react-icons/pi";
import logo from "../../assets/images/logomark02.png";
import { usePainelDeControle } from "../../hooks/usePainelDeControle";
import { theme } from "../../styles/theme";
import { PreviewAreaMobile } from "./PreviewAreaMobile";
import { ControlAreaMobile } from "./ControlAreaMobile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  background-color: ${theme.colors.white};
`;

const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background-color: ${theme.colors.blue};
  border-bottom: 1px solid #f0f0f0;
  z-index: 10;
`;

export const MobileView: React.FC = () => {
  const {
    previewImage,
    imageName,
    fileInputRef,
    handleImageUpload,
    handleRemoveImage,
  } = usePainelDeControle();

  return (
    <Container>
      <Header>
        <Image src={logo} width="80px" alt="gap-logo" objectFit="contain" />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {previewImage ? (
          <Box display="flex" gap="8px" alignItems="center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: theme.colors.white,
                color: theme.colors.blue,
                border: "none",
                borderRadius: "0px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.5rem 1rem",
              }}
            >
              <PiImage size="1.2rem" />
              <Text
                size="0.8rem"
                weight="700"
                style={{
                  maxWidth: "80px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {imageName || "Imagem"}
              </Text>
            </Button>
            <Button
              onClick={handleRemoveImage}
              style={{
                backgroundColor: "transparent",
                color: theme.colors.white,
                border: `2px solid ${theme.colors.white}`,
                borderRadius: "0px",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
              }}
            >
              <PiTrashFill size="1rem" />
            </Button>
          </Box>
        ) : (
          <Button
            onClick={() => fileInputRef.current?.click()}
            style={{
              backgroundColor: "transparent",
              color: theme.colors.white,
              border: `2px solid ${theme.colors.white}`,
              borderRadius: "0px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.5rem 1rem",
            }}
          >
            <PiBoxArrowUpFill size="1.2rem" />
            <Text size="0.8rem" weight="700">
              Enviar Imagem
            </Text>
          </Button>
        )}
      </Header>

      <PreviewAreaMobile />

      <ControlAreaMobile />
    </Container>
  );
};
