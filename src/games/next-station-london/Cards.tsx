import CardsStack from "../../components/CardsStack";
import { StationCard } from "./types";
import { useEffect, useMemo, useState, useImperativeHandle, forwardRef } from "react";
import EmptyStack from "./EmptyStack";
import useWidthBreakpoint, {
  breakPoints,
} from "../../hooks/useWidthBreakpoint";
import GameCard from "./GameCard";

interface CardsProps {
  cards: StationCard[];
  onClick: (discoveredCard: StationCard) => void;
}

export interface CardsRef {
  undo: () => boolean;
  canUndo: () => boolean;
}

const Cards = forwardRef<CardsRef, CardsProps>(({ cards, onClick }, ref) => {
  const [discoveredCard, setDiscoveredCard] = useState<StationCard[]>([]);
  const [history, setHistory] = useState<StationCard[][]>([[]]);
  const width = useWidthBreakpoint();
  const cardsSize =
    width <= breakPoints.md
      ? { width: "100px", height: "70px" }
      : { width: "160px", height: "105px" };

  useEffect(() => {
    setDiscoveredCard([]);
    setHistory([[]]);
  }, [cards]);

  useImperativeHandle(ref, () => ({
    undo: () => {
      if (history.length > 1) {
        const previousState = history[history.length - 2];
        const removedCard = discoveredCard[discoveredCard.length - 1];
        setDiscoveredCard(previousState);
        setHistory(history.slice(0, -1));
        return removedCard !== undefined;
      }
      return false;
    },
    canUndo: () => history.length > 1,
  }));

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
            const newDiscoveredCards = [...discoveredCard, card];
            setDiscoveredCard(newDiscoveredCards);
            setHistory([...history, newDiscoveredCards]);
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
});

Cards.displayName = "Cards";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    gap: "1rem",
  },
};

export default Cards;
