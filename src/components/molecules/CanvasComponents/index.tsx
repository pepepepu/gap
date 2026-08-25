import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PanelContainer = styled.main`
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export interface CanvasAreaProps {
  $format: string;
}

export const CanvasArea = styled.div<CanvasAreaProps>`
  position: relative;
  width: ${({ $format }) => {
    if ($format === "9:16") return "360px";
    if ($format === "16:9") return "640px";
    return "500px";
  }};
  height: ${({ $format }) => {
    if ($format === "9:16") return "640px";
    if ($format === "16:9") return "360px";
    return "500px";
  }};
  background-color: ${theme.colors.white};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
`;

export interface SectionProps {
  $orientation: string;
  $order: string;
  $bgColor?: string;
}

export const TextSection = styled.div<SectionProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor, theme }) =>
    $bgColor || theme.colors.primary};
  padding: 1.5rem;
  overflow: hidden;
  transition:
    all 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease;
  ${({ $orientation, $order }) => {
    if ($orientation === "horizontal") {
      return `
        width: 50%;
        height: 100%;
        top: 0;
        left: ${$order === "text-first" ? "0" : "50%"};
      `;
    }
    return `
      width: 100%;
      height: 50%;
      left: 0;
      top: ${$order === "text-first" ? "0" : "50%"};
    `;
  }}
`;

export interface ImageSectionProps extends SectionProps {
  $bgImage?: string | null;
}

export const ImageSection = styled.div<ImageSectionProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  background-image: ${({ $bgImage }) =>
    $bgImage ? `url(${$bgImage})` : "none"};
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  ${({ $orientation, $order }) => {
    if ($orientation === "horizontal") {
      return `
        width: 50%;
        height: 100%;
        top: 0;
        left: ${$order === "text-first" ? "50%" : "0"};
      `;
    }
    return `
      width: 100%;
      height: 50%;
      left: 0;
      top: ${$order === "text-first" ? "50%" : "0"};
    `;
  }}
`;

export const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

export const DynamicText = styled.div<{
  $textSize: number;
  $textColor: string;
}>`
  color: ${({ $textColor }) => $textColor};
  font-size: ${({ $textSize }) => `${$textSize}px`};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 300;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.2em 0.4em;
  transition:
    font-size 0.3s ease,
    color 0.3s ease;
`;

export const WordWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const SeparatorWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const SeparatorText = styled.span<{ $textColor: string }>`
  color: ${({ $textColor }) => $textColor};
  display: inline-block;
  transition: color 0.3s ease;
`;

export const CutoutContainer = styled.div<{ $size: number; $shape: string }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  overflow: hidden;
  display: inline-block;
  ${({ $shape }) => {
    if ($shape === "circulo") return "border-radius: 50%;";
    if ($shape === "triangulo")
      return "clip-path: polygon(50% 0%, 0% 100%, 100% 100%);";
    if ($shape === "estrela")
      return "clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);";
    return "border-radius: 0;";
  }}
`;

export const CutoutInner = styled.img<{
  $imgW: number;
  $imgH: number;
  $posX: number;
  $posY: number;
  $size: number;
}>`
  width: ${({ $imgW }) => $imgW}px;
  height: ${({ $imgH }) => $imgH}px;
  object-fit: cover;
  object-position: center;
  transform: translate(
    calc(
      ${({ $imgW, $posX, $size }) => -(($posX / 100) * $imgW) + $size / 2}px
    ),
    calc(${({ $imgH, $posY, $size }) => -(($posY / 100) * $imgH) + $size / 2}px)
  );
`;

export const Hole = styled.div<{
  $size: number;
  $shape: string;
  $posX: number;
  $posY: number;
  $bgColor: string;
}>`
  position: absolute;
  z-index: 1;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $bgColor }) => $bgColor};
  left: ${({ $posX }) => $posX}%;
  top: ${({ $posY }) => $posY}%;
  transform: translate(-50%, -50%);
  ${({ $shape }) => {
    if ($shape === "circulo") return "border-radius: 50%;";
    if ($shape === "triangulo")
      return "clip-path: polygon(50% 0%, 0% 100%, 100% 100%);";
    if ($shape === "estrela")
      return "clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);";
    return "border-radius: 0;";
  }}
`;

export const PanelMobile = styled.main`
  flex: 1;
  width: 100%;
  background-color: #f8f9fa;
  background-image: radial-gradient(#d5d5d5 1px, transparent 1px);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const ScaleWrapper = styled.div<{ $w: number; $h: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(
    calc(min(85vw / ${({ $w }) => $w}, 50vh / ${({ $h }) => $h}))
  );
  transform-origin: center center;
  transition: transform 0.3s ease;
`;

export const DrawerContainer = styled.aside`
  width: 100vw;
  height: 35dvh;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom, 1rem));

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

export const MainMenuRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 64px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s ease;

  &:active {
    opacity: 0.6;
  }
`;

export const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f5f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid #e0e5ff;
`;
