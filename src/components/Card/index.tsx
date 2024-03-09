import React from "react";

export interface CardProps {
  size: {
    width: string;
    height: string;
  };
  recto: React.ReactNode;
  verso?: React.ReactNode;
  isShown?: boolean;
  onClick?: () => void;
}

const Card = ({ size, recto, verso, isShown = true, onClick }: CardProps) => {
  return (
    <button
      style={{
        width: size.width,
        height: size.height,
        display: "flex",
        alignItems: "stretch",
        border: "4px solid black",
        borderRadius: "6px",
      }}
      onClick={onClick}
      disabled={!onClick}
    >
      {isShown ? recto : verso || <div />}
    </button>
  );
};

export default Card;
