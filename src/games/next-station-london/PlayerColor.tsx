import { Color } from "./types";
import { colorMap } from "./utils";

interface PlayerColorProps {
  color: Color;
}

const PlayerColor = ({ color }: PlayerColorProps) => {
  return (
    <div
      style={{
        width: "35px",
        height: "35px",
        backgroundColor: colorMap[color],
        border: "4px solid black",
        borderRadius: "4px",
      }}
    />
  );
};

export default PlayerColor;
