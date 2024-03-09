import { Game } from "../../games/types";
import MenuItem from "./MenuItem";

interface MenuProps {
  games: Game[];
  onGameSelected: (game: Game) => void;
}

const Menu = ({ games, onGameSelected }: MenuProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-4 items-stretch"
      style={{ maxWidth: "500px" }}
    >
      {games.map((game, index) => (
        <MenuItem
          key={game.id + index}
          game={game}
          onClick={() => onGameSelected(game)}
        />
      ))}
    </div>
  );
};

export default Menu;
