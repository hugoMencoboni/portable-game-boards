import { useEffect, useState } from "react";
import { RoundConfig } from "./types";
import PlayerColor from "./PlayerColor";
import PlayerBonus from "./PlayerBonus";

interface PlayerSideProps {
  config: RoundConfig;
  style?: React.CSSProperties;
}

const PlayerSide = ({ config, style }: PlayerSideProps) => {
  const [isBonusConsumed, setIsBonusConsumed] = useState(false);

  useEffect(() => {
    setIsBonusConsumed(false);
  }, [config]);

  const handleBonusClick = () => {
    setIsBonusConsumed(true);
  };

  return (
    <div style={{ ...styles.container, ...(style || {}) }}>
      <PlayerColor color={config.color} />
      <PlayerBonus
        bonus={config.bonus}
        isShown={!isBonusConsumed}
        onClick={handleBonusClick}
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
};

export default PlayerSide;
