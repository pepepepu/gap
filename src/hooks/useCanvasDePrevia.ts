import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLacunaStore } from "../store/useLacunaStore";

const getImageSectionDimensions = (format: string, orientation: string) => {
  let w = 500,
    h = 500;
  if (format === "9:16") {
    w = 360;
    h = 640;
  } else if (format === "16:9") {
    w = 640;
    h = 360;
  }
  if (orientation === "horizontal") return { w: w / 2, h };
  return { w, h: h / 2 };
};

const getSeparatorChars = (sep: string) => {
  if (sep === "()") return ["(", ")"];
  if (sep === "[]") return ["[", "]"];
  if (sep === "{}") return ["{", "}"];
  if (sep === "**") return ["*", "*"];
  return ["", ""];
};

export const useCanvasDePrevia = () => {
  const {
    orientation,
    order,
    format,
    text,
    separator,
    textSize,
    bgColor,
    textColor,
    previewImage,
    exportImage,
    isExporting,
    shape,
    size,
    quantity,
    cutoutPositions,
  } = useLacunaStore();

  const textRef = useRef<HTMLDivElement>(null);

  const activeImage = isExporting ? exportImage : previewImage;

  const currentText = text.trim() === "" ? "preencha o espaço" : text;
  const words = currentText.trim().split(/\s+/);

  const { w: imgW, h: imgH } = getImageSectionDimensions(format, orientation);
  const [prefix, suffix] = getSeparatorChars(separator);
  const actualQuantity = Math.min(quantity, Math.max(0, words.length - 1));

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { scale: 1, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
      );
    }
  }, [separator, format, orientation, order]);

  return {
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
  };
};
