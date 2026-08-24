import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  transition:
    opacity 0.2s ease,
    transform 0.1s ease;

  background-color: ${({ theme }) => {
    return theme.colors.primary;
  }};

  color: ${({ theme }) => theme.colors.white};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;
