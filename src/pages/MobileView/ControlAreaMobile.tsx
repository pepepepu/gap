import gsap from "gsap";
import React, { useRef, useState } from "react";
import {
  PiBracketsCurly,
  PiCaretLeft,
  PiCircle,
  PiColumns,
  PiDeviceMobile,
  PiExportFill,
  PiFrameCorners,
  PiImage,
  PiLayout,
  PiPalette,
  PiProhibit,
  PiPuzzlePieceFill,
  PiRectangle,
  PiRows,
  PiScissors,
  PiSquare,
  PiStar,
  PiTextAa,
  PiTriangle,
} from "react-icons/pi";
import styled from "styled-components";
import {
  Box,
  Button,
  ColorPicker,
  LabelInput,
  SelectionGroup,
  Slider,
  Text,
} from "../../components";
import { usePainelDeControle } from "../../hooks/usePainelDeControle";
import { theme } from "../../styles/theme";

const DrawerContainer = styled.aside`
  width: 100vw;
  height: 30dvh;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom, 1rem));

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

const MainMenuRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 64px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s ease;

  &:active {
    opacity: 0.6;
  }
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f5f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid #e0e5ff;
`;

type MenuType =
  | "text"
  | "colors"
  | "format"
  | "layout"
  | "separator"
  | "cutout"
  | null;

export const ControlAreaMobile: React.FC = () => {
  const {
    text,
    format,
    orientation,
    order,
    separator,
    shape,
    quantity,
    size,
    textSize,
    bgColor,
    textColor,
    maxCutouts,
    setText,
    setFormat,
    setOrientation,
    setOrder,
    setSeparator,
    setShape,
    setQuantity,
    setSize,
    setTextSize,
    setBgColor,
    setTextColor,
    randomizePositions,
    handleExport,
  } = usePainelDeControle();

  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleActionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.85 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
    );
    action();
  };

  const changeMenu = (
    menu: MenuType,
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (isAnimating.current) return;

    if (e) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.85 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
      );
    }

    isAnimating.current = true;
    const isEnteringSubmenu = menu !== null;

    gsap.to(contentRef.current, {
      x: isEnteringSubmenu ? -40 : 40,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setActiveMenu(menu);

        if (contentRef.current?.parentElement) {
          contentRef.current.parentElement.scrollTop = 0;
        }

        gsap.fromTo(
          contentRef.current,
          { x: isEnteringSubmenu ? 40 : -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  };

  const renderMainMenu = () => (
    <MainMenuRow>
      <MenuButton onClick={(e) => changeMenu("text", e)}>
        <IconCircle>
          <PiTextAa />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Texto
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("colors", e)}>
        <IconCircle>
          <PiPalette />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Cores
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("format", e)}>
        <IconCircle>
          <PiFrameCorners />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Formato
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("layout", e)}>
        <IconCircle>
          <PiLayout />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Layout
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("separator", e)}>
        <IconCircle>
          <PiBracketsCurly />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Separador
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("cutout", e)}>
        <IconCircle>
          <PiScissors />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Recorte
        </Text>
      </MenuButton>
    </MainMenuRow>
  );

  const renderSubMenu = () => {
    switch (activeMenu) {
      case "text":
        return (
          <Box flexDirection="column" gap="1.5rem" display="flex">
            <LabelInput
              label="Texto da Composição"
              placeholder="Digite sua frase aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              lines={3}
              maxLength={100}
              borderRadius="16px"
            />
            <Slider
              label="Tamanho do Texto"
              value={textSize}
              min={12}
              max={120}
              onChange={setTextSize}
            />
          </Box>
        );
      case "colors":
        return (
          <Box flexDirection="column" gap="15px" display="flex">
            <ColorPicker
              text="Cor do fundo"
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
            <ColorPicker
              text="Cor do texto"
              bgColor={textColor}
              setBgColor={setTextColor}
            />
          </Box>
        );
      case "format":
        return (
          <SelectionGroup
            label="Formato de Exportação"
            value={format}
            onChange={setFormat}
            options={[
              { label: "1x1", value: "1x1", symbolIcon: <PiSquare /> },
              { label: "9:16", value: "9:16", symbolIcon: <PiDeviceMobile /> },
              { label: "16:9", value: "16:9", symbolIcon: <PiRectangle /> },
            ]}
          />
        );
      case "layout":
        return (
          <Box flexDirection="column" gap="1.5rem" display="flex">
            <SelectionGroup
              label="Orientação"
              value={orientation}
              onChange={setOrientation}
              options={[
                {
                  label: "Vertical",
                  value: "vertical",
                  symbolIcon: <PiRows />,
                },
                {
                  label: "Horizontal",
                  value: "horizontal",
                  symbolIcon: <PiColumns />,
                },
              ]}
            />
            <SelectionGroup
              label="Ordem"
              value={order}
              onChange={setOrder}
              options={[
                {
                  label: "Texto 1º",
                  value: "text-first",
                  symbolIcon: <PiTextAa />,
                },
                {
                  label: "Imagem 1º",
                  value: "image-first",
                  symbolIcon: <PiImage />,
                },
              ]}
            />
          </Box>
        );
      case "separator":
        return (
          <SelectionGroup
            label="Separador"
            value={separator}
            onChange={setSeparator}
            options={[
              { label: "Nenhum", value: "none", symbolIcon: <PiProhibit /> },
              { label: "Parênteses", value: "()", symbolText: "( )" },
              { label: "Colchetes", value: "[]", symbolText: "[ ]" },
              { label: "Chaves", value: "{}", symbolText: "{ }" },
              { label: "Asteriscos", value: "**", symbolText: "* *" },
            ]}
          />
        );
      case "cutout":
        return (
          <Box flexDirection="column" gap="1.5rem" display="flex">
            <SelectionGroup
              label="Formato do Recorte"
              value={shape}
              onChange={setShape}
              options={[
                {
                  label: "Quadrado",
                  value: "quadrado",
                  symbolIcon: <PiSquare />,
                },
                {
                  label: "Círculo",
                  value: "circulo",
                  symbolIcon: <PiCircle />,
                },
                {
                  label: "Triângulo",
                  value: "triangulo",
                  symbolIcon: <PiTriangle />,
                },
                { label: "Estrela", value: "estrela", symbolIcon: <PiStar /> },
              ]}
            />
            <Slider
              label="Quantidade de Recortes"
              value={quantity}
              min={0}
              max={maxCutouts}
              onChange={setQuantity}
            />
            <Slider
              label="Tamanho do Recorte"
              value={size}
              min={10}
              max={200}
              onChange={setSize}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <DrawerContainer>
      <DrawerHeader>
        {activeMenu ? (
          <Button
            onClick={(e) => changeMenu(null, e)}
            style={{
              backgroundColor: "transparent",
              color: theme.colors.primary,
              border: "none",
              padding: "0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minWidth: "120px",
            }}
          >
            <PiCaretLeft size="1.5rem" />
            <Text weight="700">Voltar</Text>
          </Button>
        ) : (
          <Text
            weight="700"
            size="1.1rem"
            color="primary"
            style={{ minWidth: "120px" }}
          >
            Ferramentas
          </Text>
        )}

        <Box display="flex" gap="0.5rem" alignItems="center">
          <Button
            onClick={(e) => handleActionClick(e, randomizePositions)}
            style={{
              backgroundColor: "#f5f7ff",
              color: theme.colors.primary,
              border: `1px solid #e0e5ff`,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            }}
          >
            <PiPuzzlePieceFill size="1.2rem" />
          </Button>

          <Button
            onClick={(e) => handleActionClick(e, handleExport)}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
              border: `1px solid ${theme.colors.primary}`,
              borderRadius: "99px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              padding: "0.5rem 1rem",
            }}
          >
            <PiExportFill size="1.1rem" />
            <Text size="0.8rem" weight="700" color="white">
              Exportar
            </Text>
          </Button>
        </Box>
      </DrawerHeader>

      <DrawerBody>
        <div ref={contentRef} style={{ width: "100%", paddingBottom: "2rem" }}>
          {activeMenu === null ? renderMainMenu() : renderSubMenu()}
        </div>
      </DrawerBody>
    </DrawerContainer>
  );
};
