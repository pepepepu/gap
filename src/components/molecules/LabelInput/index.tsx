import React from "react";
import type { DefaultTheme } from "styled-components";
import { Box, Text } from "../../atoms";
import { Input } from "../../atoms";

interface LabelInputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label: string;
  width?: string;
  labelColor?: keyof DefaultTheme["colors"];
  borderColor?: keyof DefaultTheme["colors"] | string;
  borderRadius?: string;
  lines?: number;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  width,
  labelColor = "white",
  borderColor,
  borderRadius,
  lines = 1,
  maxLength,
  ...props
}) => {
  const isTextArea = lines > 1;

  return (
    <Box flexDirection="column" gap="15px" display="flex" width={width}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text
          color={labelColor}
          weight="600"
          style={{ letterSpacing: "-0.7px" }}
        >
          {label}
        </Text>
        {maxLength && (
          <Text color="yelloww" size="0.8rem">
            Max: {maxLength}
          </Text>
        )}
      </Box>
      <Input
        width="100%"
        as={isTextArea ? "textarea" : "input"}
        rows={isTextArea ? lines : 1}
        customBorderColor={borderColor}
        customBorderRadius={borderRadius}
        maxLength={maxLength}
        {...props}
      />
    </Box>
  );
};

export default LabelInput;
