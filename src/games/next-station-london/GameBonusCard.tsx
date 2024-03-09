import Card from "../../components/Card";
import { GameBonus } from "./types";
import useWidthBreakpoint, {
  breakPoints,
} from "../../hooks/useWidthBreakpoint";
import useImage from "../../hooks/useImage";

interface GameBonusCardProps {
  bonus: GameBonus;
}

const bonusSrcMap: Record<GameBonus, string> = {
  "8 interchanges": "next-station-london.game-bonuses.8-interchanges",
  "13 areas": "next-station-london.game-bonuses.13-areas",
  "5 touristic places": "next-station-london.game-bonuses.5-touristic-places",
  "6 cross river": "next-station-london.game-bonuses.6-cross-river",
  "9 stations in an area":
    "next-station-london.game-bonuses.9-stations-in-an-area",
};

const GameBonusCard = ({ bonus }: GameBonusCardProps) => {
  const width = useWidthBreakpoint();
  const size = width <= breakPoints.md ? "50px" : "75px";
  const imgSrc = useImage(bonusSrcMap[bonus]);
  return (
    <Card
      size={{ width: size, height: size }}
      recto={
        <div
          style={{
            flex: "1 1 100%",
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
          }}
        />
      }
    />
  );
};

export default GameBonusCard;
