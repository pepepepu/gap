import styled from "styled-components";
import { theme } from "../../styles/theme";
import { PreviewAreaDesktop } from "./PreviewAreaDesktop";
import { ControlAreaDesktop } from "./ControlAreaDesktop";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${theme.colors.white};
`;

export function DesktopView() {
  return (
    <Container>
      <ControlAreaDesktop />
      <PreviewAreaDesktop />
    </Container>
  );
}
