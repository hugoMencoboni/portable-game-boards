import React from "react";

interface ButtonProps {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick: () => void;
}

const Button = ({ style, className, type, children, onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      type={type}
      style={{
        padding: "0.5rem 1rem",
        fontSize: "1.2rem",
        fontWeight: "700",
        borderRadius: "4px",
        borderWidth: "1px",
        borderColor: "black",
        backdropFilter: "sepia(70%) blur(3px)",
        boxShadow:
          "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        ...(style || {}),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
