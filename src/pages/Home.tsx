import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ControlsPanel = styled.aside`
  width: 30%;
  padding: 2rem;
  border-right: 1px solid #333;
`;

const PreviewPanel = styled.main`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Home() {
  return (
    <Container>
      <ControlsPanel>
        <h2>Controles Lacuna</h2>
      </ControlsPanel>
      <PreviewPanel>
        <h1>Preview (70%)</h1>
      </PreviewPanel>
    </Container>
  );
}
