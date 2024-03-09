import React from "react";
import CustomDice, { DiceRef } from "../../../components/Dice";
import LeafSvg from "./LeafSvg";
import CloudSvg from "./CloudSvg";
import { colors } from "..";

interface DiceProps {
  type: "green" | "yellow";
}

const Dice: React.ForwardRefRenderFunction<DiceRef, DiceProps> = (
  { type },
  ref
) => {
  const dotColor = type === "yellow" ? colors.green : colors.yellow;
  return (
    <CustomDice
      ref={ref}
      backgroundColor={type === "yellow" ? colors.yellow : colors.green}
      one={<LeafSvg color={dotColor} style={dotsPositions["1"][0]} />}
      two={
        <>
          <LeafSvg color={dotColor} style={dotsPositions["2"][0]} />
          <LeafSvg color={dotColor} style={dotsPositions["2"][1]} />
        </>
      }
      three={
        <>
          <CloudSvg color={dotColor} />
          <LeafSvg color={dotColor} style={dotsPositions["2"][0]} />
          <LeafSvg color={dotColor} style={dotsPositions["2"][1]} />
        </>
      }
      four={
        <>
          <LeafSvg color={dotColor} style={dotsPositions["3"][0]} />
          <LeafSvg color={dotColor} style={dotsPositions["3"][1]} />
          <LeafSvg color={dotColor} style={dotsPositions["3"][2]} />
        </>
      }
      five={
        <>
          <LeafSvg color={dotColor} style={dotsPositions["3"][0]} />
          <LeafSvg color={dotColor} style={dotsPositions["3"][1]} />
          <LeafSvg color={dotColor} style={dotsPositions["3"][2]} />
        </>
      }
      six={
        <>
          <LeafSvg color={dotColor} style={dotsPositions["4"][0]} />
          <LeafSvg color={dotColor} style={dotsPositions["4"][1]} />
          <LeafSvg color={dotColor} style={dotsPositions["4"][2]} />
          <LeafSvg color={dotColor} style={dotsPositions["4"][3]} />
        </>
      }
    />
  );
};

const getDotsPositions: (dots: 1 | 2 | 3 | 4) => React.CSSProperties[] = (
  dots
) => {
  const globalStyle = {
    position: "absolute",
  };
  const centred = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  switch (dots) {
    case 1:
      return [{ ...globalStyle, ...centred }] as React.CSSProperties[];
    case 2:
      return [
        { ...globalStyle, top: "25%", left: "25%" },
        { ...globalStyle, bottom: "25%", right: "25%" },
      ] as React.CSSProperties[];
    case 3:
      return [
        { ...globalStyle, top: "15%", left: "15%" },
        { ...globalStyle, bottom: "15%", right: "15%" },
        { ...globalStyle, ...centred },
      ] as React.CSSProperties[];
    case 4:
      return [
        { ...globalStyle, top: "15%", left: "15%" },
        { ...globalStyle, bottom: "15%", right: "15%" },
        { ...globalStyle, top: "15%", right: "15%" },
        { ...globalStyle, bottom: "15%", left: "15%" },
      ] as React.CSSProperties[];
    default:
      return [globalStyle] as React.CSSProperties[];
  }
};

const dotsPositions = {
  1: getDotsPositions(1),
  2: getDotsPositions(2),
  3: getDotsPositions(3),
  4: getDotsPositions(4),
};

export default React.forwardRef(Dice);
