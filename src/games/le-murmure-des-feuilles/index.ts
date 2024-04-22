import { Game } from "../types";
import LeMurmureDesFeuilles from "./LeMurmureDesFeuilles";

export const colors = {
  green: "#3e6b23",
  yellow: "#d6c498",
};

const leMurmureDesFeuilles: Game = {
  id: 1,
  label: "Le murmure des feuilles",
  menuBackgroundImgPath: "le-murmure-des-feuilles.button",
  gameBackground: {
    style: {
      ["--s" as string]: "35px", // control the size
      ["--c1" as string]: "#a6beae",
      ["--c2" as string]: "#fcf8ec",
      ["--c" as string]:
        "#0000 79%,var(--c1) 81% 99%,var(--c2) 101% 150%,#0000 0",
      background: `radial-gradient(var(--s) at 100% 100%,var(--c)),
        radial-gradient(var(--s) at 100% 0   ,var(--c)) calc(3*var(--s)/2) 0,
        radial-gradient(var(--s) at 0    100%,var(--c)) calc(  var(--s)/2) 0,
        radial-gradient(var(--s) at 0    0   ,var(--c)) calc(2*var(--s)) 0,
        repeating-linear-gradient(90deg,
          var(--c1) 0 calc(20%/3),#0000 0 calc(70%/3),
          var(--c1) 0 30%,#0000 0 50%) calc(var(--s)/-5) 0 var(--c2)`,
      backgroundSize: "calc(3*var(--s)) calc(5*var(--s)/2)",
    },
  },
  homeComponent: LeMurmureDesFeuilles,
};

export default leMurmureDesFeuilles;