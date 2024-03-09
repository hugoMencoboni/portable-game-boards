import React from "react";

interface MenuProps {
  children?: React.ReactNode;
}

const Modal = ({ children }: MenuProps) => {
  return (
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>{children}</div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  outerContainer: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "0 0 1rem rgba(0, 0, 0, 0.5)",
  },
};

export default Modal;
