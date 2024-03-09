import { StationCard } from "./types";
import Card from "../../components/Card";
import CardVerso from "./CardVerso";
import useImage from "../../hooks/useImage";

interface GameCardProps {
  card: StationCard;
  size: {
    width: string;
    height: string;
  };
  isShown: boolean;
  onClick?: (type: StationCard) => void;
}

const GameCard = ({ card, size, isShown, onClick }: GameCardProps) => {
  const src = useImage(card.srcPath);

  return (
    <Card
      size={size}
      isShown={isShown}
      onClick={() => onClick?.(card)}
      recto={
        <div
          style={{
            flex: "1 1 100%",
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
          }}
        />
      }
      verso={<CardVerso />}
    />
  );
};

export default GameCard;
