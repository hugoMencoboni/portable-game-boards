import Card from "../../components/Card";
import useImage from "../../hooks/useImage";
import useWidthBreakpoint, {
  breakPoints,
} from "../../hooks/useWidthBreakpoint";
import CardVerso from "./CardVerso";
import { RoundBonus } from "./types";

interface PlayerBonusProps {
  bonus: RoundBonus;
  isShown: boolean;
  onClick: () => void;
}

const bonusSrcMap: Record<RoundBonus, string> = {
  derivation: "next-station-london.round-bonuses.derivation",
  "no constraint": "next-station-london.round-bonuses.no-constraint",
  replay: "next-station-london.round-bonuses.replay",
  "*2": "next-station-london.round-bonuses.multiplier-2",
};

const PlayerBonus = ({ bonus, isShown, onClick }: PlayerBonusProps) => {
  const width = useWidthBreakpoint();
  const size = width <= breakPoints.md ? "50px" : "75px";
  const imgSrc = useImage(bonusSrcMap[bonus]);
  return (
    <Card
      size={{ width: size, height: size }}
      isShown={isShown}
      onClick={onClick}
      recto={
        <div
          style={{
            flex: "1 1 100%",
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
          }}
        />
      }
      verso={<CardVerso />}
    />
  );
};

export default PlayerBonus;
