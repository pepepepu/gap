import React from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Box, Button, Text } from "../../atoms";

const RangeInput = styled.input`
  flex: 1;
  -webkit-appearance: none;
  background: transparent;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 0px;
  }

  &::-webkit-slider-thumb {
    height: 16px;
    width: 16px;
    border-radius: 0%;
    background: ${({ theme }) => theme.colors.red};
    border: 2px solid ${theme.colors.red};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
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
        <Text color="white" weight="600" style={{ letterSpacing: "-0.7px" }}>
          {label}
        </Text>
        <Text color="white" weight="600" style={{ letterSpacing: "-0.7px" }}>
          {value}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <Button
          onClick={handleDecrease}
          variant="secondary"
          style={{
            height: "35px",
            width: "35px",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0px",
          }}
        >
          <PiMinusBold size={"45%"} />
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
            height: "35px",
            width: "35px",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0px",
          }}
        >
          <PiPlusBold size={"45%"} />
        </Button>
      </Box>
    </Box>
  );
};

export default Slider;
