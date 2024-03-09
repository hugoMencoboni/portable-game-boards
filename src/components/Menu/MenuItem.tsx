import { Game } from "../../games/types";
import useImage from "../../hooks/useImage";
import SquareButton from "../SquareButton";

interface MenuItemProps {
  game: Game;
  onClick: () => void;
}

const MenuItem = ({ game, onClick }: MenuItemProps) => {
  const imgSrc = useImage(game.menuBackgroundImgPath);
  return (
    <SquareButton backgroundImageUrl={imgSrc} onClick={onClick}>
      {game.label}
    </SquareButton>
  );
};

export default MenuItem;
