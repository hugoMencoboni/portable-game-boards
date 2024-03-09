import { useEffect, useState } from "react";
import { colorMap, getInitialConfig, getRoundCards } from "./utils";
import PlayerSide from "./PlayerSide";
import GameBonusCard from "./GameBonusCard";
import { StationCard } from "./types";
import Cards from "./Cards";
import useModal from "../../hooks/useModal";
import NextRoundModal from "./NextRoundModal";

const NextStationLondon = () => {
  const [config, setConfig] = useState(getInitialConfig());
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState<StationCard[]>([]);
  const [redCardsCount, setRedCardsCount] = useState(0);
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    setCards(getRoundCards());
    setRedCardsCount(0);
  }, [round]);

  const isLatestRound = round === 4;
  const onCardClicked = (discoveredCard: StationCard) => {
    if (discoveredCard.type === "red") {
      const newRedCardsCount = redCardsCount + 1;
      setRedCardsCount(newRedCardsCount);
      if (newRedCardsCount === 5) {
        showModal(
          <NextRoundModal
            lastCard={discoveredCard}
            isLatestRound={isLatestRound}
            onNextRoundClick={handleNextRoundModalClicked}
          />
        );
      }
    }
  };

  const handleNextRoundModalClicked = () => {
    hideModal();
    if (isLatestRound) {
      setConfig(getInitialConfig());
      setRound(1);
    } else {
      setRound((round % 4) + 1);
    }
  };

  const roundIndex = -1 * round + 1;
  return (
    <div style={styles.gameboard}>
      <div style={styles.center}>
        <h2>Round: {round}</h2>
        <Cards cards={cards} onClick={onCardClicked} />
        <div style={styles.bonusesAndRedCount}>
          <GameBonusCard bonus={config.gameBonuses[0]} />
          <div style={styles.redCount}>{redCardsCount}</div>
          <GameBonusCard bonus={config.gameBonuses[1]} />
        </div>
      </div>
      <PlayerSide
        config={config.rounds[Math.abs(roundIndex) % 4]}
        style={styles.playerTop}
      />
      <PlayerSide
        config={config.rounds[Math.abs(roundIndex - 1) % 4]}
        style={styles.playerRight}
      />
      <PlayerSide
        config={config.rounds[Math.abs(roundIndex - 2) % 4]}
        style={styles.playerBottom}
      />
      <PlayerSide
        config={config.rounds[Math.abs(roundIndex - 3) % 4]}
        style={styles.playerLeft}
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  gameboard: {
    width: "100%",
    flex: "1 1 100%",
    padding: "1rem",
    display: "grid",
    gap: "1rem",
    gridTemplateRows: "1fr 3fr 1fr",
    gridTemplateColumns: "1fr 3fr 1fr",
    gridTemplateAreas: `
    '.           topPlayer   .'
    'leftPlayer  center      rightPlayer'
    '.           bottomPlayer .'
    `,
  },
  center: {
    gridArea: "center",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  playerTop: {
    gridArea: "topPlayer",
    justifySelf: "center",
    alignSelf: "start",
    rotate: "180deg",
  },
  playerRight: {
    gridArea: "rightPlayer",
    justifySelf: "end",
    alignSelf: "center",
    rotate: "-90deg",
  },
  playerBottom: {
    gridArea: "bottomPlayer",
    justifySelf: "center",
    alignSelf: "end",
    rotate: "0deg",
  },
  playerLeft: {
    gridArea: "leftPlayer",
    justifySelf: "start",
    alignSelf: "center",
    rotate: "90deg",
  },
  bonusesAndRedCount: {
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  redCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    color: "white",
    backgroundColor: colorMap.pink,
    borderRadius: "50%",
    border: "4px solid black",
  },
};

export default NextStationLondon;
