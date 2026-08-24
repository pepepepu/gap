import React from "react";
import { Box, Input, Text } from "../../atoms";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ label, width, ...props }) => {
  return (
    <Box flexDirection="column" gap="0.5rem" display="flex" width={width}>
      <Text color="white">{label}</Text>
      <Input width="100%" {...props} />
    </Box>
  );
};

export default LabelInput;
