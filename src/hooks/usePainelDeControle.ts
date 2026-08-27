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

      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 800;
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
          const base64Url = canvas.toDataURL("image/jpeg", 0.7);
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
      const images = Array.from(node.querySelectorAll("img"));
      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }),
      );

      const options = {
        pixelRatio: 3,
        skipFonts: false,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      };

      await toPng(node, options).catch(() => {});

      const dataUrl = await toPng(node, options);

      if (!dataUrl) {
        setIsExporting(false);
        return;
      }

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (isIOS) {
        const overlay = document.createElement("div");
        overlay.id = "ios-export-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        overlay.style.zIndex = "99999";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.backdropFilter = "blur(5px)";
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.3s ease";

        overlay.innerHTML = `
  <div
    id="close-ios-overlay"
    style="
      position: absolute;
      top: 20px;
      right: 20px;
      color: white;
      font-size: 40px;
      font-family: 'Google Sans Code', monospace;
      cursor: pointer;
      padding: 10px;
      line-height: 1;
    "
  >
    &times;
  </div>

  <img
    src="${dataUrl}"
    style="
      max-width: 85%;
      max-height: 70vh;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    "
  />

  <p
    style="
      margin-top: 24px;
      color: white;
      font-weight: 500;
      font-family: 'Google Sans Code', monospace;
      text-align: center;
      max-width: 80%;
    "
  >
    Pressione e segure a imagem acima para salvar em suas Fotos.
  </p>
`;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
          overlay.style.opacity = "1";
        });

        const closeBtn = document.getElementById("close-ios-overlay");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            overlay.style.opacity = "0";
            setTimeout(() => document.body.removeChild(overlay), 300);
          });
        }
      } else {
        const link = document.createElement("a");
        link.download = "lacuna-arte.png";
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
