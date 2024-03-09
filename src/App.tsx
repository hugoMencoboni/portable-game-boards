import React, { useState } from "react";
import Menu from "./components/Menu";
import games from "./games";
import { Game } from "./games/types";
import Button from "./components/Button";
import ModalWrapper from "./components/ModalWrapper";
import EncryptWrapper from "./components/EncryptWrapper";

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGameSelected = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBackButton = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    const GameHomeComponent = selectedGame.homeComponent;

    return (
      <div
        style={{
          position: "relative",
          width: "fit-content",
          minWidth: "100vw",
          height: "fit-content",
          minHeight: "100vh",
        }}
      >
        {selectedGame.gameBackground && (
          <div
            style={{
              ...selectedGame.gameBackground.style,
              ...{ position: "absolute", inset: 0 },
            }}
          />
        )}
        <main className="flex flex-col justify-center items-center h-screen relative">
          <Button style={styles.back} onClick={handleBackButton}>
            Retour
          </Button>
          <ModalWrapper>
            <GameHomeComponent />
          </ModalWrapper>
        </main>
      </div>
    );
  }

  return (
    <main className="flex justify-center items-center h-screen bg-white">
      <ModalWrapper>
        <EncryptWrapper>
          {/* <FileEncrypterHelper /> */}
          <Menu games={games} onGameSelected={handleGameSelected} />
        </EncryptWrapper>
      </ModalWrapper>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  back: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
  },
};

export default App;
