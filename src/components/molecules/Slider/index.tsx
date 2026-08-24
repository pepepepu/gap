import React from "react";
import styled from "styled-components";
import { Box, Button, Text } from "../../atoms";
import { PiMinusCircleFill, PiPlusCircleFill } from "react-icons/pi";
import { theme } from "../../../styles/theme";

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
    border: 1px solid;
    border-color: ${theme.colors.primary}
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
    <Box flexDirection="column" gap="10px" display="flex">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text color="primary" weight="700">
          {label}
        </Text>
        <Text color="primary" weight="500">
          {value}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <Button
          onClick={handleDecrease}
          variant="secondary"
          style={{
            height: "40px",
            width: "40px",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "99px",
          }}
        >
          <PiMinusCircleFill size={"50%"} />
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
          style={{
            height: "40px",
            width: "40px",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "99px",
          }}
        >
          <PiPlusCircleFill size={"50%"} />
        </Button>
      </Box>
    </Box>
  );
};

export default Slider;
