import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";

interface KeyModalProps {
  onSubmit: (key: string) => void;
}

const KeyModal = ({ onSubmit }: KeyModalProps) => {
  const [userInput, setUserInput] = useState("");

  return (
    <Modal
      children={
        <form style={styles.container}>
          <h2>Clé</h2>
          <input
            type="text"
            style={styles.input}
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <Button type="submit" onClick={() => onSubmit(userInput)}>
            Valider
          </Button>
        </form>
      }
    />
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderRadius: "4px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    border: "1px solid black",
    borderRadius: "4px",
    padding: "0.5rem",
  },
};

export default KeyModal;
