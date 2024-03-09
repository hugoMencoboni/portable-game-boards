import React from "react";
import Button from "../Button";

interface SquareButtonProps {
  backgroundImageUrl: string;
  children: React.ReactNode;
  onClick: () => void;
}

const SquareButton = ({
  backgroundImageUrl,
  children,
  onClick,
}: SquareButtonProps) => {
  return (
    <Button
      className={`bg-blue-500 hover:bg-blue-700 text-white aspect-square`}
      style={{
        maxWidth: `min(40vw, 200px)`,
        fontSize: "2rem",
        WebkitTextStroke: "1px black",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SquareButton;
