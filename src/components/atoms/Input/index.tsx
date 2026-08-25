import styled, { type DefaultTheme } from "styled-components";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  customBorderColor?: keyof DefaultTheme["colors"] | string;
  customBorderRadius?: string;
  as?: "input" | "textarea";
  rows?: number;
}

const StyledInput = styled.input<any>`
  width: ${({ $width }) => $width || "100%"};
  padding: 0.75rem 1rem;
  border-radius: ${({ $customBorderRadius }) => $customBorderRadius || "8px"};
  border: 1px solid
    ${({ theme, $customBorderColor }) =>
      $customBorderColor
        ? theme.colors[$customBorderColor as keyof DefaultTheme["colors"]] ||
          $customBorderColor
        : theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  resize: ${({ as }) => (as === "textarea" ? "vertical" : "none")};
  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.7;
  }
`;

const Input: React.FC<InputProps> = ({
  width,
  customBorderColor,
  customBorderRadius,
  as,
  ...props
}) => {
  return (
    <StyledInput
      as={as}
      $width={width}
      $customBorderColor={customBorderColor}
      $customBorderRadius={customBorderRadius}
      {...props}
    />
  );
};

export { Input };
export default Input;
