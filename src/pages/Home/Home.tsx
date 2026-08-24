import styled from "styled-components";
import { ControllerPanel } from "./components/ControllerPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { theme } from "../../styles/theme";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${theme.colors.white};
`;

export function Home() {
  return (
    <Container>
      <ControllerPanel />
      <PreviewPanel />
    </Container>
  );
}
