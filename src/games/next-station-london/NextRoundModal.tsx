import Button from "../../components/Button";
import GameCard from "./GameCard";
import { StationCard } from "./types";

interface NextRoundModalProps {
  lastCard: StationCard;
  isLatestRound: boolean;
  onNextRoundClick: () => void;
}

const NextRoundModal = ({
  lastCard,
  isLatestRound,
  onNextRoundClick,
}: NextRoundModalProps) => {
  return (
    <div style={styles.container}>
      <h2>Dernière carte</h2>
      <GameCard
        card={lastCard}
        isShown
        size={{ width: "160px", height: "105px" }}
      />
      <Button onClick={onNextRoundClick}>
        {isLatestRound ? "Rejouer" : "Tour Suivant"}
      </Button>
    </div>
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
    backgroundColor: "rgb(149, 204, 245)",
  },
};

export default NextRoundModal;
