import { useState } from "react";
import styled from "styled-components";
import { Box, Input, Select, Text } from "../components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ControlsPanel = styled.aside`
  width: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow-y: auto;
`;

const PreviewPanel = styled.main`
  width: 70%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export function Home() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("()");
  const [shape, setShape] = useState("quadrado");

  return (
    <Container>
      <ControlsPanel>
        <Text isHeading size="2rem" color="yellow" margin="0 0 2rem 0">
          Controles gap
        </Text>

        <Box flexDirection="column" gap="1.5rem" display="flex">
          <Box flexDirection="column" gap="0.5rem" display="flex">
            <Text color="white">Texto da Composição</Text>
            <Input
              placeholder="Digite sua frase aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>

          <Box flexDirection="column" gap="0.5rem" display="flex">
            <Text color="white">Separador</Text>
            <Select
              value={separator}
              onChange={setSeparator}
              options={[
                { label: "Nenhum", value: "none" },
                { label: "Parênteses ()", value: "()" },
                { label: "Colchetes []", value: "[]" },
                { label: "Chaves {}", value: "{}" },
                { label: "Asteriscos **", value: "**" },
              ]}
            />
          </Box>

          <Box flexDirection="column" gap="0.5rem" display="flex">
            <Text color="white">Formato do Recorte</Text>
            <Select
              value={shape}
              onChange={setShape}
              options={[
                { label: "Quadrado", value: "quadrado" },
                { label: "Círculo", value: "circulo" },
                { label: "Triângulo", value: "triangulo" },
                { label: "Estrela", value: "estrela" },
              ]}
            />
          </Box>
        </Box>
      </ControlsPanel>

      <PreviewPanel>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <Text isHeading size="2rem" color="primary">
            Preview (70%)
          </Text>
          <Text color="textDark">Área de visualização da composição.</Text>
        </Box>
      </PreviewPanel>
    </Container>
  );
}
