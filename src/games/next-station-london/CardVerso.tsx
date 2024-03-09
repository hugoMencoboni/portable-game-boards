import { colorMap } from "./utils";

const CardVerso = () => {
  return (
    <div
      style={{
        flex: "1 1 100%",
        ["--s" as string]: "20px", // control the size
        ["--c1" as string]: colorMap.blue,
        ["--c2" as string]: "white",
        ["--_g" as string]: `${colorMap.pink}, ${colorMap.pink} 5%,
              var(--c2) 6%  14%,var(--c1) 16% 24%,var(--c2) 26% 34%,var(--c1) 36% 44%,
              var(--c2) 46% 54%,var(--c1) 56% 64%,var(--c2) 66% 74%,var(--c1) 76% 84%,
              var(--c2) 86% 94%,#0004 95%,#0000`,
        background: `
              radial-gradient(100% 50% at 100% 0   ,var(--_g)),
              radial-gradient(100% 50% at 0    50% ,var(--_g)),
              radial-gradient(100% 50% at 100% 100%,var(--_g))`,
        backgroundSize: "var(--s) calc(2*var(--s))",
      }}
    />
  );
};

export default CardVerso;
