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

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const options = {
        cacheBust: true,
        pixelRatio: 3,
        quality: 1,
      };

      await toPng(node, options);
      const dataUrl = await toPng(node, options);

      if (!dataUrl) {
        setIsExporting(false);
        return;
      }

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (isIOS) {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <title>Salvar Arte</title>
              </head>
              <body style="margin: 0; background-color: #f0f0f0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
                <img src="${dataUrl}" style="max-width: 90%; max-height: 80vh; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);" />
                <p style="margin-top: 20px; font-weight: 600; color: #333; text-align: center; padding: 0 20px;">
                  Pressione e segure a imagem para salvar.
                </p>
              </body>
            </html>
          `);
          newWindow.document.close();
        } else {
          window.location.href = dataUrl;
        }
      } else {
        const link = document.createElement("a");
        link.download = "lacuna.png";
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
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
