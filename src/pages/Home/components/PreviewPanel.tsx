import React from "react";
import { Box, Text } from "../../../components";
import { useCanvasDePrevia } from "../../../hooks/useCanvasDePrevia";
import {
  PanelContainer,
  CanvasArea,
  TextSection,
  ImageSection,
  BackgroundImg,
  DynamicText,
  WordWrapper,
  SeparatorWrapper,
  SeparatorText,
  CutoutContainer,
  CutoutInner,
  Hole,
} from "../../../components/molecules/CanvasComponents";

export const PreviewPanel: React.FC = () => {
  const {
    orientation,
    order,
    format,
    separator,
    textSize,
    bgColor,
    textColor,
    shape,
    size,
    cutoutPositions,
    textRef,
    activeImage,
    words,
    imgW,
    imgH,
    prefix,
    suffix,
    actualQuantity,
  } = useCanvasDePrevia();

  return (
    <PanelContainer>
      <Box display="flex" flexDirection="column" alignItems="center" gap="2rem">
        <CanvasArea id="export-canvas" $format={format}>
          <TextSection
            $orientation={orientation}
            $order={order}
            $bgColor={bgColor}
          >
            <DynamicText
              ref={textRef}
              $textSize={textSize}
              $textColor={textColor}
            >
              {words.map((word, index) => {
                const isCutout =
                  index < words.length - 1 && index < actualQuantity;
                const hasSeparatorText =
                  index < words.length - 1 && separator !== "none";
                const pos = cutoutPositions[index] || { x: 50, y: 50 };

                return (
                  <React.Fragment key={index}>
                    <WordWrapper>{word}</WordWrapper>
                    {index < words.length - 1 && (
                      <SeparatorWrapper>
                        {hasSeparatorText && (
                          <SeparatorText $textColor={textColor}>
                            {prefix}
                          </SeparatorText>
                        )}
                        {isCutout && activeImage && (
                          <CutoutContainer $size={size} $shape={shape}>
                            <CutoutInner
                              src={activeImage}
                              alt="cutout"
                              $imgW={imgW}
                              $imgH={imgH}
                              $posX={pos.x}
                              $posY={pos.y}
                              $size={size}
                            />
                          </CutoutContainer>
                        )}
                        {hasSeparatorText && (
                          <SeparatorText $textColor={textColor}>
                            {suffix}
                          </SeparatorText>
                        )}
                      </SeparatorWrapper>
                    )}
                  </React.Fragment>
                );
              })}
            </DynamicText>
          </TextSection>
          <ImageSection $orientation={orientation} $order={order}>
            {activeImage && (
              <BackgroundImg src={activeImage} alt="background" />
            )}
            {!activeImage && (
              <Text
                color="white"
                size="16px"
                weight="500"
                align="center"
                style={{ zIndex: 1 }}
              >
                A imagem aparecerá aqui
              </Text>
            )}
            {activeImage &&
              Array.from({ length: actualQuantity }).map((_, index) => {
                const pos = cutoutPositions[index] || { x: 50, y: 50 };
                return (
                  <Hole
                    key={index}
                    $size={size}
                    $shape={shape}
                    $posX={pos.x}
                    $posY={pos.y}
                    $bgColor={bgColor}
                  />
                );
              })}
          </ImageSection>
        </CanvasArea>
      </Box>
    </PanelContainer>
  );
};
