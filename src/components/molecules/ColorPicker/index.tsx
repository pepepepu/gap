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
  height: 40px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  background-color: transparent;
  padding: 0;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 0px;
  }

  &::-moz-color-swatch {
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 0px;
  }
`;

const ColorPicker: React.FC<ColorPickerProps> = ({
  bgColor,
  setBgColor,
  text,
}) => {
  return (
    <Box flexDirection="column" gap="10px" display="flex" width="100%">
      <Text color="white" weight="600" style={{ letterSpacing: "-0.7px" }}>
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
