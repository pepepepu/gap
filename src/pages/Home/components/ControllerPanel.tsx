import React, { useState } from "react";
import {
  PiBoxArrowUpFill,
  PiSquare,
  PiRectangle,
  PiDeviceMobile,
  PiCircle,
  PiTriangle,
  PiStar,
  PiProhibit,
} from "react-icons/pi";
import styled from "styled-components";
import logo from "../../../assets/images/logomark-blue.png";
import {
  Box,
  Button,
  Image,
  LabelInput,
  SelectionGroup,
  Slider,
  Text,
} from "../../../components";
import { theme } from "../../../styles/theme";

const PanelContainer = styled.aside`
  width: 400px;
  height: calc(100dvh - 60px);
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 10;
  overflow-y: auto;
  margin: 30px 20px;
  border-radius: 16px;

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

export const ControllerPanel: React.FC = () => {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("1x1");
  const [separator, setSeparator] = useState("()");
  const [shape, setShape] = useState("quadrado");
  const [quantity, setQuantity] = useState(4);
  const [size, setSize] = useState(50);
  const [textSize, setTextSize] = useState(32);

  return (
    <PanelContainer>
      <Box display="flex" justifyContent="center" margin="0 0 2rem 0">
        <Image src={logo} width="70px" alt="gap-logo" objectFit="contain" />
      </Box>

      <Box flexDirection="column" gap="1.5rem" display="flex">
        <Button
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

        <LabelInput
          label="Texto da Composição"
          placeholder="Digite sua frase aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          lines={5}
          maxLength={100}
          borderRadius={"24px"}
        />

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
          min={1}
          max={20}
          onChange={setQuantity}
        />

        <Slider
          label="Tamanho do Recorte"
          value={size}
          min={10}
          max={200}
          onChange={setSize}
        />

        <Button variant="secondary" fullWidth>
          Randomizar Posições
        </Button>
        <Button variant="primary" fullWidth>
          Exportar Arte
        </Button>
      </Box>
    </PanelContainer>
  );
};
