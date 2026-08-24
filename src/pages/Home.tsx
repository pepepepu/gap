import styled from "styled-components";

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
`;

const PreviewPanel = styled.main`
  width: 70%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.yellow};
  margin-bottom: 2rem;
`;

export function Home() {
  return (
    <Container>
      <ControlsPanel>
        <Title>Controles gap</Title>
      </ControlsPanel>
      <PreviewPanel>
        <h1>Preview (70%)</h1>
      </PreviewPanel>
    </Container>
  );
}
