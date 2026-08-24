import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { useLacunaStore } from "../store/useLacunaStore";

export const usePainelDeControle = () => {
  const {
    text,
    format,
    orientation,
    order,
    separator,
    shape,
    quantity,
    size,
    textSize,
    bgColor,
    textColor,
    previewImage,
    imageName,
    setText,
    setFormat,
    setOrientation,
    setOrder,
    setSeparator,
    setShape,
    setQuantity,
    setSize,
    setTextSize,
    setBgColor,
    setTextColor,
    setImage,
    setIsExporting,
    randomizePositions,
  } = useLacunaStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const words =
    text.trim() === "" ? ["preencha", "o", "espaço"] : text.trim().split(/\s+/);
  const maxCutouts = Math.max(0, words.length - 1);

  useEffect(() => {
    if (quantity > maxCutouts) {
      setQuantity(maxCutouts);
    }
  }, [maxCutouts, quantity, setQuantity]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(previewUrl, event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null, null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExport = async () => {
    const node = document.getElementById("export-canvas");
    if (!node) return;

    setIsExporting(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = "gap.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    text,
    format,
    orientation,
    order,
    separator,
    shape,
    quantity,
    size,
    textSize,
    bgColor,
    textColor,
    previewImage,
    imageName,
    maxCutouts,
    fileInputRef,
    setText,
    setFormat,
    setOrientation,
    setOrder,
    setSeparator,
    setShape,
    setQuantity,
    setSize,
    setTextSize,
    setBgColor,
    setTextColor,
    randomizePositions,
    handleImageUpload,
    handleRemoveImage,
    handleExport,
  };
};
