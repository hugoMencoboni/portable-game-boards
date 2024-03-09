import { RoundBonus, Color, Config, GameBonus, CardType } from "./types";

const colors: Color[] = ["pink", "blue", "green", "purple"];
const roundBonuses: RoundBonus[] = [
  "derivation",
  "no constraint",
  "replay",
  "*2",
];
const gameBonuses: GameBonus[] = [
  "8 interchanges",
  "5 touristic places",
  "9 stations in an area",
  "13 areas",
  "6 cross river",
];

const getRandomOrders = (limit: number): number[] => {
  const numbers = [...Array(limit)].map((_, index) => index);
  const randomNumbers: number[] = [];
  while (randomNumbers.length < limit) {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
};

export const colorMap: Record<Color, string> = {
  pink: "#e6527b",
  blue: "#217bc7",
  green: "#008b5e",
  purple: "#512c71",
};

export const getInitialConfig = (): Config => {
  const colorsOrders = getRandomOrders(colors.length);
  const roundBonusesOrders = getRandomOrders(roundBonuses.length);
  const gameBonusesOrders = getRandomOrders(gameBonuses.length);

  return {
    rounds: [
      {
        color: colors[colorsOrders[0]],
        bonus: roundBonuses[roundBonusesOrders[0]],
      },
      {
        color: colors[colorsOrders[1]],
        bonus: roundBonuses[roundBonusesOrders[1]],
      },
      {
        color: colors[colorsOrders[2]],
        bonus: roundBonuses[roundBonusesOrders[2]],
      },
      {
        color: colors[colorsOrders[3]],
        bonus: roundBonuses[roundBonusesOrders[3]],
      },
    ],
    gameBonuses: [
      gameBonuses[gameBonusesOrders[0]],
      gameBonuses[gameBonusesOrders[1]],
    ],
  };
};

const cardsMap: Record<string, { type: CardType; srcPath: string }> = {
  "blue all": {
    type: "blue",
    srcPath: "next-station-london.cards.blue_all",
  },
  "blue triangle": {
    type: "blue",
    srcPath: "next-station-london.cards.blue_triangle",
  },
  "blue square": {
    type: "blue",
    srcPath: "next-station-london.cards.blue_square",
  },
  "blue circle": {
    type: "blue",
    srcPath: "next-station-london.cards.blue_circle",
  },
  "blue hexagon": {
    type: "blue",
    srcPath: "next-station-london.cards.blue_hexagon",
  },
  "blue derivation": {
    type: "blue",
    srcPath: "next-station-london.cards.blue_derivation",
  },
  "red all": {
    type: "red",
    srcPath: "next-station-london.cards.red_all",
  },
  "red triangle": {
    type: "red",
    srcPath: "next-station-london.cards.red_triangle",
  },
  "red square": {
    type: "red",
    srcPath: "next-station-london.cards.red_square",
  },
  "red circle": {
    type: "red",
    srcPath: "next-station-london.cards.red_circle",
  },
  "red hexagon": {
    type: "red",
    srcPath: "next-station-london.cards.red_hexagon",
  },
};

export const getRoundCards = () => {
  const cards = Object.entries(cardsMap);
  const cardsOrders = getRandomOrders(Object.keys(cardsMap).length);
  return cardsOrders.map((order) => cards[order][1]);
};
