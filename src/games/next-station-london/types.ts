export interface Config {
  rounds: [RoundConfig, RoundConfig, RoundConfig, RoundConfig];
  gameBonuses: [GameBonus, GameBonus];
}

export interface RoundConfig {
  color: Color;
  bonus: RoundBonus;
}

export type GameBonus =
  | "8 interchanges"
  | "5 touristic places"
  | "9 stations in an area"
  | "13 areas"
  | "6 cross river";
export type Color = "pink" | "blue" | "green" | "purple";
export type RoundBonus = "derivation" | "no constraint" | "replay" | "*2";

export type CardType = "blue" | "red";

export interface StationCard {
  type: CardType;
  srcPath: string;
}
