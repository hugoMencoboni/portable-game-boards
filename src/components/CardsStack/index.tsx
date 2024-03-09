interface CardsStackProps<T> {
  cards: T[];
  emptyStack?: React.ReactNode;
  renderCard: (card: T, index: number) => React.ReactNode;
}

const CardsStack = <T,>({
  cards,
  renderCard,
  emptyStack,
}: CardsStackProps<T>) => {
  return (
    <div style={styles.container}>
      {cards.map((card, index) => (
        <div key={index.toString()} style={getCardStyle(index)}>
          {renderCard(card, index)}
        </div>
      ))}
      {cards.length === 0 && emptyStack ? emptyStack : null}
    </div>
  );
};

const getCardStyle = (index: number): React.CSSProperties => {
  if (index === 0) return {};

  return {
    position: "absolute",
    left: `${index * 0.5}px`,
    top: `${index * 0.5}px`,
  };
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    position: "relative",
  },
  emptyCard: {},
};

export default CardsStack;
