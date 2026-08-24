import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../components";

interface ColorPickerProps {
  bgColor: string;
  setBgColor: (color: string) => void;
  text: string;
}

const ColorPickerInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background-color: transparent;
  padding: 0;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
  }

  &::-moz-color-swatch {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
  }
`;

const ColorPicker: React.FC<ColorPickerProps> = ({
  bgColor,
  setBgColor,
  text,
}) => {
  return (
    <Box flexDirection="column" gap="10px" display="flex" width="100%">
      <Text color="primary" weight="700">
        {text}
      </Text>
      <ColorPickerInput
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
    </Box>
  );
};

export default ColorPicker;
