import gsap from "gsap";
import React, { useRef, useState } from "react";
import {
  PiBracketsCurlyFill,
  PiCaretLeft,
  PiCircle,
  PiColumns,
  PiDeviceMobile,
  PiExportFill,
  PiFrameCornersFill,
  PiImage,
  PiLayoutFill,
  PiPaletteFill,
  PiProhibit,
  PiRectangle,
  PiRows,
  PiScissorsFill,
  PiShuffleBold,
  PiSquare,
  PiStar,
  PiTextAa,
  PiTextAaFill,
  PiTriangle,
} from "react-icons/pi";
import {
  Box,
  Button,
  ColorPicker,
  LabelInput,
  SelectionGroup,
  Slider,
  Text,
} from "../../components";
import {
  DrawerBody,
  DrawerContainer,
  DrawerHeader,
  IconCircle,
  MainMenuRow,
  MenuButton,
} from "../../components/molecules/CanvasComponents";
import { usePainelDeControle } from "../../hooks/usePainelDeControle";
import { theme } from "../../styles/theme";

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
          <PiTextAaFill />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Texto
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("colors", e)}>
        <IconCircle>
          <PiPaletteFill />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Cores
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("format", e)}>
        <IconCircle>
          <PiFrameCornersFill />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Formato
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("layout", e)}>
        <IconCircle>
          <PiLayoutFill />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Layout
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("separator", e)}>
        <IconCircle>
          <PiBracketsCurlyFill />
        </IconCircle>
        <Text size="0.75rem" weight="600">
          Separador
        </Text>
      </MenuButton>
      <MenuButton onClick={(e) => changeMenu("cutout", e)}>
        <IconCircle>
          <PiScissorsFill />
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
              color: theme.colors.white,
              border: "none",
              padding: "0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minWidth: "120px",
            }}
          >
            <PiCaretLeft size="1.5rem" />
            <Text weight="700" color="white">
              Voltar
            </Text>
          </Button>
        ) : (
          <Text
            weight="700"
            size="1.1rem"
            color="white"
            style={{ minWidth: "120px" }}
          >
            Ferramentas
          </Text>
        )}

        <Box display="flex" gap="15px" alignItems="center">
          <Button
            onClick={(e) => handleActionClick(e, randomizePositions)}
            style={{
              backgroundColor: "#f5f7ff",
              color: theme.colors.blue,
              border: `1px solid #e0e5ff`,
              borderRadius: "0px",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            }}
          >
            <PiShuffleBold size="1.2rem" />
          </Button>

          <Button
            onClick={(e) => handleActionClick(e, handleExport)}
            style={{
              backgroundColor: theme.colors.white,
              color: theme.colors.blue,
              border: `2px solid ${theme.colors.white}`,
              borderRadius: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              padding: "0.5rem 1rem",
            }}
          >
            <PiExportFill size="1.1rem" />
            <Text size="0.8rem" weight="700" color="blue">
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
