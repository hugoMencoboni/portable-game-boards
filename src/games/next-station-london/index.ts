import { Game } from "../types";
import NextStationLondon from "./NextStationLondon";

const nextStationLondon: Game = {
  id: 2,
  label: "Next Station London",
  menuBackgroundImgPath: "next-station-london.button",
  gameBackground: {
    style: {
      backgroundColor: "#95ccf5",
    },
  },
  homeComponent: NextStationLondon,
};

export default nextStationLondon;
