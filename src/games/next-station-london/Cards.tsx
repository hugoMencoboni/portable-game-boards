import CardsStack from "../../components/CardsStack";
import { StationCard } from "./types";
import { useEffect, useMemo, useState } from "react";
import EmptyStack from "./EmptyStack";
import useWidthBreakpoint, {
  breakPoints,
} from "../../hooks/useWidthBreakpoint";
import GameCard from "./GameCard";

interface CardsProps {
  cards: StationCard[];
  onClick: (discoveredCard: StationCard) => void;
}

const Cards = ({ cards, onClick }: CardsProps) => {
  const [discoveredCard, setDiscoveredCard] = useState<StationCard[]>([]);
  const width = useWidthBreakpoint();
  const cardsSize =
    width <= breakPoints.md
      ? { width: "100px", height: "70px" }
      : { width: "160px", height: "105px" };

  useEffect(() => {
    setDiscoveredCard([]);
  }, [cards]);

  const nonDiscoveredCards = useMemo(() => {
    return cards.filter((card) => !discoveredCard.includes(card));
  }, [discoveredCard, cards]);

  const handleRenderNonDiscoveredCards = (card: StationCard, index: number) => {
    return (
      <GameCard
        card={card}
        isShown={false}
        size={cardsSize}
        onClick={() => {
          if (index === nonDiscoveredCards.length - 1) {
            setDiscoveredCard([...discoveredCard, card]);
            onClick(card);
          }
        }}
      />
    );
  };

  const handleRenderDiscoveredCards = (card: StationCard) => {
    return <GameCard card={card} isShown size={cardsSize} />;
  };

  return (
    <div style={styles.container}>
      <CardsStack
        cards={nonDiscoveredCards}
        renderCard={handleRenderNonDiscoveredCards}
        emptyStack={
          <EmptyStack width={cardsSize.width} height={cardsSize.height} />
        }
      />
      <CardsStack
        cards={discoveredCard}
        renderCard={handleRenderDiscoveredCards}
        emptyStack={
          <EmptyStack width={cardsSize.width} height={cardsSize.height} />
        }
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    gap: "1rem",
  },
};

export default Cards;
