import React from "react";
import { DesktopView } from "./DesktopView";
import { MobileView } from "./MobileView";
import { useMobile } from "../hooks/useMobile";

export const Home: React.FC = () => {
  const isMobile = useMobile();

  return isMobile ? <MobileView /> : <DesktopView />;
};
