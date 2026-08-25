import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
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

      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const mimeType =
            file.type === "image/png" ? "image/png" : "image/jpeg";
          const quality = mimeType === "image/jpeg" ? 0.85 : undefined;
          const base64Url = canvas.toDataURL(mimeType, quality);

          setImage(previewUrl, base64Url, file.name);
        }
      };
      img.src = previewUrl;
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
      const canvas = await html2canvas(node, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsExporting(false);
          return;
        }

        const fileName = "lacuna-arte.png";
        const isIOS =
          /iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

        if (isIOS) {
          if (
            navigator.canShare &&
            navigator.canShare({
              files: [new File([blob], fileName, { type: blob.type })],
            })
          ) {
            try {
              const file = new File([blob], fileName, { type: blob.type });
              await navigator.share({
                files: [file],
                title: "Sua Arte Lacuna",
              });
            } catch (err) {
              const dataUrl = canvas.toDataURL("image/png");
              openInNewTab(dataUrl);
            }
          } else {
            const dataUrl = canvas.toDataURL("image/png");
            openInNewTab(dataUrl);
          }
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = fileName;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }

        setIsExporting(false);
      }, "image/png");
    } catch (err) {
      setIsExporting(false);
    }
  };

  const openInNewTab = (dataUrl: string) => {
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
