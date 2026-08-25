import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
}

const SelectContainer = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width || "100%"};
`;

const SelectTrigger = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ $isSelected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.textDark};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primary : "transparent"};
  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.yellow};
    color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.white : theme.colors.textDark};
  }
`;

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectContainer $width={width} ref={containerRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : placeholder}
        <span> </span>
      </SelectTrigger>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              $isSelected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SelectContainer>
  );
};

export default Select;
