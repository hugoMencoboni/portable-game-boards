import { useRef } from "react";
import Dice from "./Dice";
import Button from "../../components/Button";
import { DiceRef } from "../../components/Dice";

const LeMurmureDesFeuilles = () => {
  const firstDiceRef = useRef<DiceRef>(null);
  const secondDiceRef = useRef<DiceRef>(null);

  const handleRollDices = () => {
    firstDiceRef.current?.roll();
    secondDiceRef.current?.roll();
  };

  return (
    <>
      <h2>Le murmure des feuilles</h2>
      <div className="flex gap-10 my-10">
        <Dice type="green" ref={firstDiceRef} />
        <Dice type="yellow" ref={secondDiceRef} />
      </div>
      <Button onClick={handleRollDices}>Lancer</Button>
    </>
  );
};

export default LeMurmureDesFeuilles;
