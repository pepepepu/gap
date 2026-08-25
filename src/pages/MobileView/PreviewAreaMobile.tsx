import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Text } from "../../components";
import {
  BackgroundImg,
  CanvasArea,
  CutoutContainer,
  CutoutInner,
  DynamicText,
  Hole,
  ImageSection,
  PanelMobile,
  ScaleWrapper,
  SeparatorText,
  SeparatorWrapper,
  TextSection,
  WordWrapper,
} from "../../components/molecules/CanvasComponents";
import { useCanvasDePrevia } from "../../hooks/useCanvasDePrevia";

export const PreviewAreaMobile: React.FC = () => {
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

  const canvasNativeW = format === "9:16" ? 360 : format === "16:9" ? 640 : 500;
  const canvasNativeH = format === "9:16" ? 640 : format === "16:9" ? 360 : 500;

  return (
    <PanelMobile>
      <TransformWrapper
        initialScale={0.5}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScaleWrapper $w={canvasNativeW} $h={canvasNativeH}>
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
          </ScaleWrapper>
        </TransformComponent>
      </TransformWrapper>
    </PanelMobile>
  );
};
