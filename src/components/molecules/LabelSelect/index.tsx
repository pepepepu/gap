import React from "react";
import { Box, Select, Text } from "../../atoms";

interface Option {
  label: string;
  value: string;
}

interface LabelSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
}

const LabelSelect: React.FC<LabelSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  width,
}) => {
  return (
    <Box flexDirection="column" gap="0.5rem" display="flex" width={width}>
      <Text color="white">{label}</Text>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width="100%"
      />
    </Box>
  );
};

export default LabelSelect;
