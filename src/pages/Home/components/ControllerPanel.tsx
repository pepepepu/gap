import React from "react";
import {
  PiBoxArrowUpFill,
  PiCircle,
  PiColumns,
  PiDeviceMobile,
  PiExportFill,
  PiImage,
  PiProhibit,
  PiPuzzlePieceFill,
  PiRectangle,
  PiRows,
  PiSquare,
  PiStar,
  PiTextAa,
  PiTrashFill,
  PiTriangle,
} from "react-icons/pi";
import logo from "../../../assets/images/logomark-blue.png";
import {
  Box,
  Button,
  ColorPicker,
  Image,
  LabelInput,
  PanelContainer,
  SelectionGroup,
  Slider,
  Text,
} from "../../../components";
import { usePainelDeControle } from "../../../hooks/usePainelDeControle";
import { theme } from "../../../styles/theme";

export const ControllerPanel: React.FC = () => {
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
    previewImage,
    imageName,
    maxCutouts,
    fileInputRef,
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
    handleImageUpload,
    handleRemoveImage,
    handleExport,
  } = usePainelDeControle();

  return (
    <PanelContainer>
      <Box display="flex" justifyContent="center" margin="0 0 2rem 0">
        <Image src={logo} width="70px" alt="gap-logo" objectFit="contain" />
      </Box>

      <Box flexDirection="column" gap="1.5rem" display="flex">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {previewImage ? (
          <Box display="flex" gap="10px" alignItems="center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                border: `1px solid ${theme.colors.primary}`,
                borderRadius: "99px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <PiImage size={"1.2rem"} style={{ flexShrink: 0 }} />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "180px",
                }}
              >
                {imageName || "Imagem Selecionada"}
              </Text>
            </Button>
            <Button
              onClick={handleRemoveImage}
              style={{
                backgroundColor: "transparent",
                color: theme.colors.primary,
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <PiTrashFill size={"1.2rem"} />
            </Button>
          </Box>
        ) : (
          <Button
            onClick={() => fileInputRef.current?.click()}
            style={{
              backgroundColor: "transparent",
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}`,
              borderRadius: "99px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <PiBoxArrowUpFill size={"1.2rem"} />
            <Text style={{ textAlign: "center", fontWeight: 700 }}>
              Enviar Imagem
            </Text>
          </Button>
        )}

        <LabelInput
          label="Texto da Composição"
          placeholder="Digite sua frase aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          lines={5}
          maxLength={100}
          borderRadius={"24px"}
        />

        <Box display="flex" gap="1rem">
          <ColorPicker
            text={"Cor do fundo"}
            bgColor={bgColor}
            setBgColor={setBgColor}
          />

          <ColorPicker
            text={"Cor do texto"}
            bgColor={textColor}
            setBgColor={setTextColor}
          />
        </Box>

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

        <SelectionGroup
          label="Orientação"
          value={orientation}
          onChange={setOrientation}
          options={[
            { label: "Vertical", value: "vertical", symbolIcon: <PiRows /> },
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

        <SelectionGroup
          label="Separador"
          value={separator}
          onChange={setSeparator}
          options={[
            { label: "Parênteses", value: "()", symbolText: "( )" },
            { label: "Colchetes", value: "[]", symbolText: "[ ]" },
            { label: "Chaves", value: "{}", symbolText: "{ }" },
            { label: "Asteriscos", value: "**", symbolText: "* *" },
            { label: "Nenhum", value: "none", symbolIcon: <PiProhibit /> },
          ]}
        />

        <Slider
          label="Tamanho do Texto"
          value={textSize}
          min={12}
          max={120}
          onChange={setTextSize}
        />

        <SelectionGroup
          label="Formato do Recorte"
          value={shape}
          onChange={setShape}
          options={[
            { label: "Quadrado", value: "quadrado", symbolIcon: <PiSquare /> },
            { label: "Círculo", value: "circulo", symbolIcon: <PiCircle /> },
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

        <Button
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: "99px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            overflow: "hidden",
          }}
          onClick={randomizePositions}
        >
          <PiPuzzlePieceFill size={"1.2rem"} style={{ flexShrink: 0 }} />
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "180px",
            }}
          >
            Randomizar recortes
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: "99px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            overflow: "hidden",
          }}
          fullWidth
          onClick={handleExport}
        >
          <PiExportFill size={"1.2rem"} style={{ flexShrink: 0 }} />
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "180px",
            }}
          >
            Exportar arte
          </Text>
        </Button>
      </Box>
    </PanelContainer>
  );
};
