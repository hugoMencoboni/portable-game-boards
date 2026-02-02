import { BonusHint } from "./bonusHints";
import Button from "../../components/Button";

interface BonusHintModalProps {
  hint: BonusHint;
  onClose: () => void;
}

const BonusHintModal = ({ hint, onClose }: BonusHintModalProps) => {
  return (
    <div style={styles.content}>
      <h2 style={styles.title}>{hint.title}</h2>
      
      <div style={styles.description}>{hint.description}</div>

      <Button onClick={onClose} style={styles.button}>
        Fermer
      </Button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  content: {
    backgroundColor: "rgb(149, 204, 245)",
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "90vw",
    width: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "1.8rem",
    lineHeight: "1.6",
    textAlign: "center",
  },
  button: {
    padding: "1rem 2rem",
    fontSize: "1.6rem",
    cursor: "pointer",
  },
};

export default BonusHintModal;
