import React from "react";
import styled from "styled-components";
import { Box, Button, Text } from "../../atoms";

const RangeInput = styled.input`
  flex: 1;
  -webkit-appearance: none;
  background: transparent;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  &::-webkit-slider-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.yellow};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
`;

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const handleDecrease = () => {
    if (value > min) onChange(Math.max(min, value - step));
  };

  const handleIncrease = () => {
    if (value < max) onChange(Math.min(max, value + step));
  };

  return (
    <Box flexDirection="column" gap="0.5rem" display="flex">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text color="white">{label}</Text>
        <Text color="yellow" weight="bold">
          {value}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <Button
          onClick={handleDecrease}
          variant="secondary"
          style={{ padding: "0.5rem 1rem" }}
        >
          -
        </Button>
        <RangeInput
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <Button
          onClick={handleIncrease}
          variant="secondary"
          style={{ padding: "0.5rem 1rem" }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default Slider;
