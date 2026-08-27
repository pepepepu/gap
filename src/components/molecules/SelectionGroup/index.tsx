import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../atoms";

interface Option {
  label: string;
  value: string;
  symbolText?: string;
  symbolIcon?: React.ReactNode;
}

interface SelectionGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

const OptionsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  flex: 1;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 4px;
  border-radius: 0px;
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.yelloww : theme.colors.white};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.yelloww : "transparent"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const IconWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 100%;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.black : theme.colors.white};
`;

const SelectionGroup: React.FC<SelectionGroupProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <Box flexDirection="column" gap="10px" display="flex" width="100%">
      <Text color="white" weight="600" style={{ letterSpacing: "-0.7px" }}>
        {label}
      </Text>
      <OptionsContainer>
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            isSelected={value === opt.value}
            onClick={() => onChange(opt.value)}
            type="button"
          >
            {opt.symbolText && (
              <Text
                size="1.5rem"
                color={value === opt.value ? "black" : "white"}
                style={{ lineHeight: "100%" }}
              >
                {opt.symbolText}
              </Text>
            )}

            {opt.symbolIcon && (
              <IconWrapper isSelected={value === opt.value}>
                {opt.symbolIcon}
              </IconWrapper>
            )}

            <Text
              size="0.75rem"
              color={value === opt.value ? "black" : "white"}
              align="center"
            >
              {opt.label}
            </Text>
          </OptionButton>
        ))}
      </OptionsContainer>
    </Box>
  );
};

export default SelectionGroup;
