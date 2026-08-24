import { styled } from "styled-components";

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

export default PanelContainer;
