import { create } from "zustand";

interface Position {
  x: number;
  y: number;
}

interface LacunaState {
  text: string;
  format: string;
  orientation: string;
  order: string;
  separator: string;
  shape: string;
  quantity: number;
  size: number;
  textSize: number;
  bgColor: string;
  textColor: string;
  previewImage: string | null;
  exportImage: string | null;
  imageName: string | null;
  isExporting: boolean;
  cutoutPositions: Position[];
  setText: (text: string) => void;
  setFormat: (format: string) => void;
  setOrientation: (orientation: string) => void;
  setOrder: (order: string) => void;
  setSeparator: (separator: string) => void;
  setShape: (shape: string) => void;
  setQuantity: (quantity: number) => void;
  setSize: (size: number) => void;
  setTextSize: (textSize: number) => void;
  setBgColor: (bgColor: string) => void;
  setTextColor: (textColor: string) => void;
  setImage: (
    preview: string | null,
    exportImg: string | null,
    name?: string | null,
  ) => void;
  setIsExporting: (status: boolean) => void;
  randomizePositions: () => void;
}

export const useLacunaStore = create<LacunaState>((set) => ({
  text: "",
  format: "1x1",
  orientation: "vertical",
  order: "text-first",
  separator: "()",
  shape: "quadrado",
  quantity: 4,
  size: 40,
  textSize: 22,
  bgColor: "#ececec",
  textColor: "#1f1e1e",
  previewImage: null,
  exportImage: null,
  imageName: null,
  isExporting: false,
  cutoutPositions: Array(20)
    .fill(0)
    .map(() => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    })),
  setText: (text) => set({ text }),
  setFormat: (format) => set({ format }),
  setOrientation: (orientation) => set({ orientation }),
  setOrder: (order) => set({ order }),
  setSeparator: (separator) => set({ separator }),
  setShape: (shape) => set({ shape }),
  setQuantity: (quantity) => set({ quantity }),
  setSize: (size) => set({ size }),
  setTextSize: (textSize) => set({ textSize }),
  setBgColor: (bgColor) => set({ bgColor }),
  setTextColor: (textColor) => set({ textColor }),
  setImage: (preview, exportImg, name = null) =>
    set({ previewImage: preview, exportImage: exportImg, imageName: name }),
  setIsExporting: (status) => set({ isExporting: status }),
  randomizePositions: () =>
    set({
      cutoutPositions: Array(20)
        .fill(0)
        .map(() => ({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        })),
    }),
}));
