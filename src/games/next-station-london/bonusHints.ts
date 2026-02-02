import { GameBonus } from "./types";

export interface BonusHint {
  title: string;
  description: string;
}

export const gameBonusHints: Record<GameBonus, BonusHint> = {
  "8 interchanges": {
    title: "8 correspondances",
    description:
      "Grâce à l'ensemble de vos lignes, réalisez 8 correspondances différentes par lesquelles passent au moins 2 de vos lignes de métro.",
  },
  "13 areas": {
    title: "13 quartiers",
    description:
      "Grâce à l'ensemble de vos lignes, passez par au moins une station dans chacun des 13 quartiers de la ville.",
  },
  "5 touristic places": {
    title: "5 sites touristiques",
    description:
      "Grâce à l'ensemble de vos lignes, passez par les 5 sites touristiques de la ville.",
  },
  "6 cross river": {
    title: "6 traversées de la Tamise",
    description:
      "Grâce à l'ensemble de vos lignes, traversez au moins 6 fois la Tamise.",
  },
  "9 stations in an area": {
    title: "9 stations du quartier central",
    description:
      "Grâce à l'ensemble de vos lignes, passez par les 9 stations du quartier central de la ville.",
  },
};
