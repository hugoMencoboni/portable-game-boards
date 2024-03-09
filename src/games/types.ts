import React from "react";

export interface Game {
  label: string;
  id: number;
  menuBackgroundImgPath: string;
  gameBackground: {
    style: React.CSSProperties;
  };
  homeComponent: React.ComponentType<any>;
}
