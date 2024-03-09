import React, { ReactNode, useImperativeHandle, useRef, useState } from "react";

interface DiceProps {
  backgroundColor: string;
  one: ReactNode;
  two: ReactNode;
  three: ReactNode;
  four: ReactNode;
  five: ReactNode;
  six: ReactNode;
}

export interface DiceRef {
  roll: () => number;
}

const Dice: React.ForwardRefRenderFunction<DiceRef, DiceProps> = (
  { backgroundColor, one, two, three, four, five, six },
  ref
) => {
  const [value, setValue] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const diceRef = useRef<HTMLDivElement>(null);
  const diceContainerRef = useRef<HTMLDivElement>(null);

  const roll = () => {
    const newValue = Math.floor(Math.random() * 6 + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    if (newValue !== value) {
      let transform = "";
      switch (newValue) {
        case 1:
          transform = "rotateX(720deg) rotateZ(-720deg)";
          break;
        case 2:
          transform = "rotateX(-900deg) rotateZ(900deg)";
          break;
        case 3:
          transform = "rotateY(810deg) rotateZ(720deg)";
          break;
        case 4:
          transform = "rotateX(-810deg) rotateZ(-1080deg)";
          break;
        case 5:
          transform = "rotateX(450deg) rotateZ(-720deg)";
          break;
        case 6:
          transform = "rotateY(-450deg) rotateZ(-1440deg)";
          break;
      }

      diceRef.current?.style.setProperty("transform", transform);
    } else {
      diceContainerRef.current?.animate(
        [
          { transform: "scale(1,1)      translateY(0)", offset: 0 },
          { transform: "scale(1.1,.9)   translateY(0)", offset: 0.1 },
          { transform: "scale(.9,1.1)   translateY(-40%)", offset: 0.3 },
          { transform: "scale(1.05,.95) translateY(0)", offset: 0.5 },
          { transform: "scale(1,1)      translateY(15%)", offset: 0.57 },
          { transform: "scale(1,1)      translateY(0)", offset: 0.64 },
          { transform: "scale(1,1)      translateY(0)", offset: 1 },
        ],
        {
          duration: 1_500,
          easing: "cubic-bezier(0.280, 0.840, 0.420, 1)",
          iterations: 1,
        }
      );
    }

    setValue(newValue);
    return newValue;
  };

  useImperativeHandle(ref, () => ({
    roll,
  }));

  const sideStyle: React.CSSProperties = { ...styles.side, backgroundColor };
  return (
    <div ref={diceContainerRef}>
      <div ref={diceRef} style={styles.dice}>
        <div style={{ ...sideStyle, ...styles.diceOne }}>{one}</div>
        <div style={{ ...sideStyle, ...styles.diceTwo }}>{two}</div>
        <div style={{ ...sideStyle, ...styles.diceThree }}>{three}</div>
        <div style={{ ...sideStyle, ...styles.diceFour }}>{four}</div>
        <div style={{ ...sideStyle, ...styles.diceFive }}>{five}</div>
        <div style={{ ...sideStyle, ...styles.diceSix }}>{six}</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  dice: {
    position: "relative",
    width: "100px",
    height: "100px",
    transformStyle: "preserve-3d",
    transition: "transform 1s",
  },
  side: {
    position: "absolute",
    borderRadius: "5px",
    width: "100px",
    height: "100px",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  diceOne: {
    transform: "translateZ(3.1em)",
  },
  diceTwo: {
    transform: "rotateY(-180deg) translateZ(3.1em)",
  },
  diceThree: {
    transform: "rotateY(-90deg) translateZ(3.1em)",
  },
  diceFour: {
    transform: "rotateX(90deg) translateZ(3.1em)",
  },
  diceFive: {
    transform: "rotateX(-90deg) translateZ(3.1em)",
  },
  diceSix: {
    transform: "rotateY(90deg) translateZ(3.1em)",
  },
};

export default React.forwardRef(Dice);
