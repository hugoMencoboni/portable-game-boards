import { useRef } from "react";
import Dice from "./Dice";
import Button from "../../components/Button";
import { DiceRef } from "../../components/Dice";
import useModal from "../../hooks/useModal";
import RulesModal from "./RulesModal";

const LeMurmureDesFeuilles = () => {
  const firstDiceRef = useRef<DiceRef>(null);
  const secondDiceRef = useRef<DiceRef>(null);
  const { showModal, hideModal } = useModal();

  const handleRollDices = () => {
    firstDiceRef.current?.roll();
    secondDiceRef.current?.roll();
  };

  const handleRulesClick = () => {
    showModal(<RulesModal onClose={hideModal} />);
  };

  return (
    <div style={styles.container}>
      <Button onClick={handleRulesClick} style={styles.rulesButton}>
        📖 Règles
      </Button>
      <h2>Le murmure des feuilles</h2>
      <div className="flex gap-10 my-10">
        <Dice type="green" ref={firstDiceRef} />
        <Dice type="yellow" ref={secondDiceRef} />
      </div>
      <Button onClick={handleRollDices}>Lancer</Button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rulesButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    fontSize: "1.4rem",
    padding: "0.6rem 1.2rem",
    zIndex: 10,
  },
};

export default LeMurmureDesFeuilles;
