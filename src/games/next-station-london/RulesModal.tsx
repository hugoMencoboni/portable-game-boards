import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import useImage from "../../hooks/useImage";

interface RulesModalProps {
  onClose: () => void;
}

type TabType = "base" | "advanced" | "solo";

const RulesModal = ({ onClose }: RulesModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("base");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);
  const finalScoreImage = useImage("next-station-london.rules.finalScore");
  const constructionImage = useImage("next-station-london.rules.construction");
  const validInvalidImage = useImage("next-station-london.rules.validInvalid");
  const johnExampleImage = useImage("next-station-london.rules.johnExample");
  const crossingValidImage = useImage("next-station-london.rules.crossingValid");
  const crossingInvalidImage = useImage("next-station-london.rules.crossingInvalid");
  const startingStationsImage = useImage("next-station-london.rules.startingStations");
  const startingStationExampleImage = useImage("next-station-london.rules.startingStationExample");
  const multipleScenariosImage = useImage("next-station-london.rules.multipleScenarios");
  const centralStationImage = useImage("next-station-london.rules.centralStation");
  const touristSiteImage = useImage("next-station-london.rules.touristSite");
  const jokerSymbolImage = useImage("next-station-london.rules.jokerSymbol");
  const aiguillageSymbolImage = useImage("next-station-london.rules.aiguillageSymbol");
  const aiguillageCardImage = useImage("next-station-london.rules.aiguillageCard");
  const aiguillageBoardImage = useImage("next-station-london.rules.aiguillageBoard");
  const correspondanceIconImage = useImage("next-station-london.rules.correspondanceIcon");
  const correspondanceExampleImage = useImage("next-station-london.rules.correspondanceExample");
  const districtsIconImage = useImage("next-station-london.rules.districtsIcon");
  const stationsIconImage = useImage("next-station-london.rules.stationsIcon");
  const thamesIconImage = useImage("next-station-london.rules.thamesIcon");
  const touristExampleImage = useImage("next-station-london.rules.touristExample");
  const totalExampleImage = useImage("next-station-london.rules.totalExample");
  const interchangesBonusImage = useImage("next-station-london.game-bonuses.8-interchanges");
  const areasBonusImage = useImage("next-station-london.game-bonuses.13-areas");
  const touristPlacesBonusImage = useImage("next-station-london.game-bonuses.5-touristic-places");
  const centralAreaBonusImage = useImage("next-station-london.game-bonuses.9-stations-in-an-area");
  const crossRiverBonusImage = useImage("next-station-london.game-bonuses.6-cross-river");
  const replayPowerImage = useImage("next-station-london.round-bonuses.replay");
  const noConstraintPowerImage = useImage("next-station-london.round-bonuses.no-constraint");
  const derivationPowerImage = useImage("next-station-london.round-bonuses.derivation");
  const multiplierPowerImage = useImage("next-station-london.round-bonuses.multiplier-2");
  const multiplierExampleImage = useImage("next-station-london.rules.multiplierExample");

  return (
    <div style={styles.content}>
      <h2 style={styles.title}>Règles du jeu</h2>
      
      {/* Tab Navigation with Close Button */}
      <div style={styles.tabNavContainer}>
        <div style={styles.tabNav}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "base" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("base")}
          >
            Règles de base
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "advanced" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("advanced")}
          >
            Mode avancé
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "solo" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("solo")}
          >
            Mode solo
          </button>
        </div>
        <Button onClick={onClose} style={styles.closeButton}>
          Fermer
        </Button>
      </div>
      
      <div ref={scrollContainerRef} style={styles.scrollContainer}>
        {/* BASE RULES TAB */}
        {activeTab === "base" && (
          <>
        <div style={styles.darkBlueBox}>
          <h3 style={styles.boxTitle}>BUT DU JEU</h3>
          <p style={styles.text}>
            Remportez un maximum de points en optimisant le tracé des 4 lignes de métro sur votre plan de Londres.
          </p>
        </div>

        <div style={styles.darkBlueBox}>
          <h3 style={styles.boxTitle}>MISE EN PLACE</h3>
          <p style={styles.text}>
            Chaque joueur prend une feuille Plan de Londres avec un crayon de couleur de son choix et les place devant lui.
          </p>
          <p style={styles.text}>
            <strong>→ Dans une partie à 3 joueurs</strong>, posez le crayon restant sur l'aire de jeu entre deux joueurs de votre choix. Vous utiliserez ce crayon plus tard dans la partie.
          </p>
          <p style={styles.text}>
            <strong>→ Dans une partie à 2 joueurs</strong>, posez les 2 crayons restants sur l'aire de jeu, en plaçant un crayon à gauche de chacun des deux joueurs. Vous les utiliserez plus tard dans la partie.
          </p>
          <p style={styles.text}>
            <strong>→ Pour une partie Solo</strong>, suivez les précisions apportées en fin de règles dans le paragraphe Mode de jeu Solo.
          </p>
          <p style={styles.text}>
            Lors de vos premières parties, nous vous conseillons de laisser les 5 cartes Objectif commun et les 4 cartes Pouvoir de crayon dans la boîte. Vous pourrez les utiliser par la suite pour le mode de jeu avancé.
          </p>
          <p style={styles.text}>
            <em>→ Voir le paragraphe Mode de jeu avancé.</em>
          </p>
          <p style={styles.text}>
            Le joueur qui a pris le métro le plus récemment est désigné contrôleur de la première manche.
          </p>
        </div>

        <div style={styles.yellowBox}>
          <h3 style={styles.boxTitle}>PRÉSENTATION DU JEU</h3>
          <p style={styles.text}>
            Une partie se déroule en 4 manches. Au cours d'une manche, chaque joueur va tracer sur sa feuille la ligne de métro qui correspond à la couleur du crayon qu'il a en main. À la fin de la partie, chacun aura tracé son propre réseau de 4 lignes de métro dans la ville de Londres, soit une ligne de métro de chaque couleur.
          </p>
        </div>

        <div style={styles.yellowBox}>
          <h3 style={styles.boxTitle}>PLAN DE LONDRES</h3>
          <p style={styles.text}>
            Chaque feuille de jeu représente la ville de Londres sur laquelle vous tracez vos lignes de métro ainsi qu'une zone de score dans laquelle vous notez vos points.
          </p>
        </div>

        <div style={styles.yellowBox}>
          <h3 style={styles.boxTitle}>QUARTIERS</h3>
          <p style={styles.text}>
            La ville de Londres est découpée en 13 quartiers :
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}><strong>9 quartiers, dits « principaux »</strong>, contenant chacun plusieurs stations de métro,</li>
            <li style={styles.listItem}><strong>et 4 quartiers, dits « secondaires »</strong>, situés aux 4 coins de la ville et ne contenant qu'une seule station chacun.</li>
          </ul>
        </div>

        <div style={styles.yellowBox}>
          <h3 style={styles.boxTitle}>STATIONS</h3>
          <p style={styles.text}>
            Il existe 4 types de stations, chacune étant représentée par un symbole :<br/>
            ⬜ Carré  △ Triangle  ⬠ Pentagone  ⭕ Cercle
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>DÉROULEMENT DU JEU</h3>
          <p style={styles.text}>
            Pour chacune des 4 manches, effectuez les phases suivantes dans l'ordre indiqué :
          </p>
          <ol style={styles.orderedList}>
            <li style={styles.orderedItem}>Identifiez votre station de départ</li>
            <li style={styles.orderedItem}>Construisez votre ligne de métro</li>
            <li style={styles.orderedItem}>Remportez les points générés par votre ligne</li>
            <li style={styles.orderedItem}>Préparez-vous pour la ligne de métro suivante</li>
          </ol>
        </div>

        <div style={styles.pinkBox}>
          <h3 style={styles.pinkTitle}>① Identifiez votre station de départ</h3>
          <p style={styles.text}>
            Repérez sur votre plan de Londres où se trouve la station de départ de la ligne de métro que vous allez construire. Il s'agit de la station ayant la même couleur que celle du crayon que vous avez en main. Chaque joueur a donc une station de départ qui lui est propre pour la manche en cours.
          </p>
          <p style={styles.text}>
            <strong style={{color: '#4CAF50'}}>△ Station de départ du joueur qui utilise le crayon vert pour la manche en cours.</strong>
          </p>
          <p style={styles.text}>
            <strong style={{color: '#2196F3'}}>⭕ Station de départ du joueur qui utilise le crayon bleu, et ainsi de suite...</strong>
          </p>
        </div>

        <div style={styles.blueBox}>
          <h3 style={styles.blueTitle}>② Construisez votre ligne de métro</h3>
          <p style={styles.text}>
            Cette phase de construction est constituée d'une succession de tours de jeu, de 5 à 10 maximum, selon les cartes Station révélées. À chaque tour, les joueurs tracent, s'ils le souhaitent, une section de métro avec leur crayon de couleur pour construire au fur et à mesure leur ligne de métro.
          </p>
          <h4 style={styles.subTitle}>SECTION DE MÉTRO</h4>
          <p style={styles.text}>
            Une ligne de métro est constituée de plusieurs sections mises bout à bout. On nomme « section » chaque trait qui relie deux stations directement entre elles.
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Le contrôleur de la manche mélange les 11 cartes Station et les place en une pile face cachée au centre des joueurs.</li>
            <li style={styles.listItem}>À chaque tour de jeu, le contrôleur pioche la carte Station du haut de la pile et la révèle face visible. Tous les joueurs tracent simultanément sur leur feuille une section de métro en respectant <strong>les règles de construction</strong> <em>(voir pages 7 à 8)</em>.</li>
            <li style={styles.listItem}>Lorsque le contrôleur révèle la 5ᵉ carte Souterrain (à fond rose et jaune), ceci déclenche la fin de la manche en cours. Les joueurs peuvent tracer une dernière section de métro pour relier leur ligne au symbole révélé. Chacun procède alors au décompte des points générés par la ligne de métro qu'il vient d'achever.</li>
          </ul>
        </div>

        <div style={styles.purpleBox}>
          <h3 style={styles.purpleTitle}>③ Remportez les points générés par votre ligne</h3>
          <p style={styles.text}>
            Chaque ligne de métro rapporte des points selon les trois caractéristiques suivantes : <strong>son itinéraire, ses traversées de la Tamise et les sites touristiques qu'elle dessert.</strong>
          </p>
          <p style={styles.text}>
            Inscrivez dans votre zone de score les points générés par chaque caractéristique de votre ligne <em>(voir pages 11 et 12)</em>.
          </p>
        </div>

        <div style={styles.greenBox}>
          <h3 style={styles.greenTitle}>④ Préparez-vous pour la ligne de métro suivante</h3>
          <p style={styles.textSmall}>(Ignorez cette phase lors de la 4ᵉ manche !)</p>
          <p style={styles.text}>
            Lorsque vous avez inscrit tous les points rapportés par votre ligne, procédez au changement de crayons :
          </p>
          <p style={styles.text}>
            <strong>→</strong> Récupérez le crayon de couleur du joueur situé à votre droite, ou bien, récupérez celui posé à votre droite sur l'aire de jeu lors d'une partie à moins de 4 joueurs.
          </p>
          <p style={styles.text}>
            <strong>→</strong> Jouez la manche suivante avec le crayon que vous venez de récupérer pour construire la ligne de métro de la couleur correspondante. Le contrôleur de la nouvelle manche est le joueur situé à gauche du contrôleur de la manche précédente.
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>FIN DU JEU</h3>
          <p style={styles.text}>
            La partie prend fin à l'issue de la quatrième manche, lorsque tous les joueurs ont tracé leur réseau de 4 lignes de métro de couleurs différentes.
          </p>
          <p style={styles.text}>
            Procédez au décompte final de tous vos points générés par votre réseau de métro londonien de la façon suivante :
          </p>
        </div>

        <div style={styles.pinkBox}>
          <p style={styles.text}>
            <strong>Points des 4 lignes :</strong> faites d'abord la somme des points générés par vos 4 lignes de métro et inscrivez ce total dans la dernière case rose située la plus à droite de votre ligne de score.
          </p>
        </div>

        <div style={styles.pinkBox}>
          <p style={styles.text}>
            <strong>Points des sites touristiques :</strong> sur votre échelle de score touristique, identifiez le symbole non coché situé le plus à gauche. Reportez ce nombre de points dans le symbole correspondant de votre ligne de score.
          </p>
        </div>

        <div style={styles.greenBox}>
          <p style={styles.text}>
            <strong>Points des correspondances :</strong> comptabilisez ensuite les points rapportés par toutes vos correspondances. Il en existe trois types : les correspondances à 2 lignes, à 3 lignes ou à 4 lignes de métro.
          </p>
          <p style={styles.text}>
            <strong>→ Dans tout votre réseau</strong>, comptez le nombre de correspondances que vous avez réalisées dans chacun des trois types et inscrivez ces nombres dans leur case respective.
          </p>
          <p style={styles.text}>
            <strong>→ Pour chaque type</strong>, multipliez le nombre de correspondances réalisées par le nombre de points qu'elle rapporte :
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>↪ chaque correspondance à 2 lignes rapporte 2 points,</li>
            <li style={styles.listItem}>↪ chaque correspondance à 3 lignes rapporte 5 points,</li>
            <li style={styles.listItem}>↪ chaque correspondance à 4 lignes rapporte 9 points.</li>
          </ul>
          <p style={styles.text}>
            <strong>→ Additionnez</strong> les points rapportés par chacun des types de correspondances et inscrivez ce total dans la case verte de votre ligne de score.
          </p>
        </div>

        <div style={styles.yellowBox}>
          <h3 style={styles.boxTitle}>Déterminez votre score final</h3>
          <p style={styles.text}>
            en additionnant les points générés par vos 4 lignes de métro, les points de vos sites touristiques et les points de vos correspondances : inscrivez ce total dans le panneau final situé tout en bas à droite de votre zone de score.
          </p>
        </div>

        <div style={styles.exampleSection}>
          <div style={styles.exampleText}>
            <p style={styles.text}>
              <strong>Exemple : </strong>John est passé 7 fois par différents sites touristiques. Sur son échelle de score touristique, le symbole non coché situé le plus à gauche lui fait gagner 14 points. De plus, il a généré neuf correspondances à 2 lignes de métro mais aucune correspondance à 3 lignes ni à 4 lignes. Il remporte donc 18 points pour ses correspondances. John totalise un score final de 119 points (87 + 14 + 18) pour tout son réseau de métro londonien.
            </p>
          </div>
          {finalScoreImage && (
            <div style={styles.exampleImage}>
              <img 
                src={finalScoreImage} 
                alt="Exemple de score final" 
                style={styles.image}
              />
            </div>
          )}
        </div>

        <div style={styles.darkBlueBox}>
          <h3 style={styles.boxTitle}>TERMINUS !</h3>
          <p style={styles.text}>
            Tout le monde rend son crayon ! Le joueur ayant le score final le plus élevé remporte la partie et devient le meilleur maître d'œuvre de la ville de Londres.
          </p>
          <p style={styles.text}>
            En cas d'égalité, le joueur ayant le score le plus élevé pour une seule ligne de métro est déclaré vainqueur. Si l'égalité persiste, les joueurs concernés se réjouissent de partager leur victoire sur ce magnifique projet !
          </p>
        </div>

        <div style={styles.constructionRulesBox}>
          <h3 style={styles.constructionTitle}>RÈGLES DE CONSTRUCTION</h3>

          <ul style={styles.constructionList}>
            <li style={styles.constructionItem}>
              Tracer une section est toujours facultatif. Si vous ne pouvez pas ou ne voulez pas tracer de section lors d'un tour, ignorez la carte Station révélée et reprenez le tracé de votre ligne de métro dès la prochaine carte Station qui vous conviendra.
            </li>
            <li style={styles.constructionItem}>
              Chaque section que vous tracez doit être une ligne droite, <strong>horizontale, verticale ou diagonale</strong>, qui suit le quadrillage des lignes en filigrane.
            </li>
          </ul>
          
          <div style={styles.imagesRow}>
            {constructionImage && (
              <div style={styles.imageInRow}>
                <img 
                  src={constructionImage} 
                  alt="Règles de construction" 
                  style={styles.smallImage}
                />
              </div>
            )}
            {validInvalidImage && (
              <div style={styles.imageInRow}>
                <img 
                  src={validInvalidImage} 
                  alt="Exemples valides et invalides" 
                  style={styles.smallImage}
                />
              </div>
            )}
          </div>

          <ul style={styles.constructionList}>
            <li style={styles.constructionItem}>
              <strong>→</strong> La première section d'une ligne de métro doit toujours être tracée depuis votre station de départ et être reliée à une station ayant le même symbole que celui de la carte révélée par le contrôleur.
            </li>
            <li style={styles.constructionItem}>
              <strong>→</strong> Chaque section suivante doit être tracée depuis l'une des extrémités de votre ligne de métro, pour être reliée à une station ayant le même symbole que celui de la carte révélée par le contrôleur.
            </li>
          </ul>

          <p style={styles.exceptionText}>
            <strong>Exception :</strong> voir l'effet de la carte spéciale <strong>Aiguillage</strong>.
          </p>

          {johnExampleImage && (
            <div style={styles.johnExampleContainer}>
              <div style={styles.exampleTextBox}>
                <p style={styles.exampleTextContent}>
                  <strong>Exemple :</strong> John joue la première manche avec le crayon vert. Sa station de départ verte est celle avec le symbole Triangle vert. La carte Station révélée par le contrôleur montre un symbole Cercle. John choisit de tracer sa section de métro vers le symbole Cercle situé à gauche de sa station de départ.
                </p>
              </div>
              <div style={styles.johnExampleImage}>
                <img 
                  src={johnExampleImage} 
                  alt="Exemple de John" 
                  style={styles.smallerImage}
                />
              </div>
            </div>
          )}

          <ul style={styles.constructionList}>
            <li style={styles.constructionItem}>
              Chacune de vos sections doit toujours relier deux stations sans traverser de station intermédiaire, ni croiser toute autre section déjà tracée.
            </li>
          </ul>

          <div style={styles.imagesRow}>
            {crossingValidImage && (
              <div style={styles.imageInRow}>
                <img 
                  src={crossingValidImage} 
                  alt="Exemple valide - pas de croisement" 
                  style={styles.smallImage}
                />
              </div>
            )}
            {crossingInvalidImage && (
              <div style={styles.imageInRow}>
                <img 
                  src={crossingInvalidImage} 
                  alt="Exemple invalide - croisement interdit" 
                  style={styles.smallImage}
                />
              </div>
            )}
          </div>

          <ul style={styles.constructionList}>
            <li style={styles.constructionItem}>
              <strong>Stations de départ :</strong> bien qu'elles servent à démarrer la construction de votre ligne de métro au début de chaque manche, ces 4 stations sont aussi considérées comme des stations normales. Vous pouvez les utiliser pour le tracé de vos différentes sections lorsque le contrôleur révèle une carte ayant le symbole correspondant.
            </li>
          </ul>

          <div style={styles.imagesRow}>
            {startingStationsImage && (
              <div style={styles.imageInRow}>
                <img 
                  src={startingStationsImage} 
                  alt="Les 4 stations de départ" 
                  style={styles.smallerHeightImage}
                />
              </div>
            )}
            {startingStationExampleImage && (
              <div style={styles.imageInRow}>
                <img 
                  src={startingStationExampleImage} 
                  alt="Exemple d'utilisation d'une station de départ" 
                  style={styles.smallImage}
                />
              </div>
            )}
          </div>

          <ul style={styles.constructionList}>
            <li style={styles.constructionItem}>
              Vous ne pouvez jamais repasser par une station déjà présente sur votre ligne de métro en cours de construction.
            </li>
            <li style={styles.constructionItem}>
              Vous ne pouvez jamais tracer plusieurs sections entre deux mêmes stations.
            </li>
          </ul>

          {multipleScenariosImage && (
            <div style={styles.centerImageContainer}>
              <img 
                src={multipleScenariosImage} 
                alt="Exemples de règles de construction" 
                style={styles.largeImage}
              />
            </div>
          )}
        </div>

        <div style={styles.specialStationsSection}>
          <div style={styles.specialStationsHeader}>
            <h3 style={styles.specialStationsTitle}>STATIONS SPÉCIALES</h3>
            <div style={styles.questionMarkIcon}>?</div>
          </div>

          <div style={styles.specialStationsContent}>
            <div style={styles.specialStationItem}>
              {centralStationImage && (
                <img 
                  src={centralStationImage} 
                  alt="Gare centrale" 
                  style={styles.stationIcon}
                />
              )}
              <div style={styles.stationDescription}>
                <p style={styles.stationText}>
                  <strong>Gare centrale :</strong> cette station située au cœur de Londres est représentée par un point d'interrogation. Cela signifie que chaque joueur est libre, à tout moment de la partie, de considérer cette gare centrale comme ayant le symbole de leur choix pour y relier leurs sections, quelles que soient les cartes révélées par le contrôleur.
                </p>
              </div>
            </div>

            <div style={styles.specialStationItem}>
              {touristSiteImage && (
                <img 
                  src={touristSiteImage} 
                  alt="Site touristique" 
                  style={styles.stationIcon}
                />
              )}
              <div style={styles.stationDescription}>
                <p style={styles.stationText}>
                  <strong>Sites touristiques :</strong> cinq stations de la ville se trouvent sur des sites touristiques de Londres. Chaque site est représenté par une rose des vents entourant le symbole de la station de métro concernée.
                </p>
                <p style={styles.stationText}>
                  Vous pouvez relier une ou plusieurs lignes de métro à un ou plusieurs sites touristiques : cela vous rapportera des points supplémentaires lors du décompte de fin de partie. Voir le paragraphe <em>Points des sites touristiques</em>.
                </p>
                <div style={styles.noteBox}>
                  <p style={styles.noteText}>
                    Il est à noter que la gare centrale est entourée d'une rose des vents : elle fait donc partie des 5 sites touristiques de la ville.
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.specialStationItem}>
              {jokerSymbolImage && (
                <img 
                  src={jokerSymbolImage} 
                  alt="Symbole Joker" 
                  style={styles.stationIcon}
                />
              )}
              <div style={styles.stationDescription}>
                <p style={styles.stationText}>
                  <strong>Symbole Joker :</strong> lors du tour pendant lequel ce symbole apparaît sur la carte révélée par le contrôleur, chaque joueur choisit librement le symbole de la station vers laquelle il trace sa nouvelle section de métro.
                </p>
              </div>
            </div>

            <div style={styles.specialStationItem}>
              {aiguillageSymbolImage && (
                <img 
                  src={aiguillageSymbolImage} 
                  alt="Symbole Aiguillage" 
                  style={styles.stationIcon}
                />
              )}
              <div style={styles.stationDescription}>
                <p style={styles.stationText}>
                  <strong>Symbole Aiguillage :</strong> lors du tour pendant lequel la carte Aiguillage est révélée, le contrôleur pioche aussitôt la prochaine carte Station de la pile et la révèle face visible. La carte Aiguillage permet à tous les joueurs, s'ils le souhaitent, de tracer leur nouvelle section depuis n'importe quelle station de leur ligne en construction.
                </p>
                <p style={styles.stationText}>
                  Cette carte permet ainsi de créer une extrémité supplémentaire à sa ligne de métro, à partir de laquelle les joueurs pourront tracer leurs futures sections, et ce, jusqu'à la fin de la manche en cours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.casParticulierBox}>
          <p style={styles.casParticulierText}>
            <strong>Cas particulier :</strong> si la carte Aiguillage est révélée par le contrôleur lors du premier ou du deuxième tour d'une manche, son effet n'est pas applicable.
          </p>
        </div>

        <div style={styles.exampleBoxDark}>
          {aiguillageCardImage && (
            <div style={styles.aiguillageCardColumn}>
              <img 
                src={aiguillageCardImage} 
                alt="Carte Aiguillage" 
                style={styles.aiguillageCardImage}
              />
            </div>
          )}
          <div style={styles.exampleRightColumn}>
            <p style={styles.exampleTextWhite}>
              <strong>Exemple :</strong> le contrôleur tire la carte Aiguillage. Il révèle aussitôt la prochaine carte Station de la pile, il s'agit d'un symbole Carré. John pourrait prolonger l'extrémité de sa ligne de métro vers l'un des deux symboles Carré situés à côté du cercle, comme l'indique chaque double flèche.
            </p>
            <p style={styles.exampleTextWhite}>
              Mais il préfère bénéficier de l'effet de la carte Aiguillage : il utilise donc une station intermédiaire, en l'occurrence une station Triangle, pour la relier au carré situé en bas à droite, comme l'indique le trait en pointillés.
            </p>
          </div>
          {aiguillageBoardImage && (
            <div style={styles.aiguillageBoardColumn}>
              <img 
                src={aiguillageBoardImage} 
                alt="Exemple Aiguillage sur le plateau" 
                style={styles.aiguillageBoardImage}
              />
            </div>
          )}
        </div>

        <div style={styles.correspondancesSection}>
          <div style={styles.correspondanceHeader}>
            {correspondanceIconImage && (
              <img 
                src={correspondanceIconImage} 
                alt="Icône correspondance" 
                style={styles.correspondanceIconImg}
              />
            )}
            <div style={styles.correspondanceDescription}>
              <p style={styles.correspondanceText}>
                <strong>Correspondances :</strong> à partir de la deuxième manche et jusqu'à la fin de la partie, il vous sera également possible de relier plusieurs lignes de métro à une même station, on nomme cela une « correspondance ». Chaque correspondance dans votre réseau vous rapportera des points supplémentaires en fin de partie en fonction du nombre de lignes de métro qui y seront reliées. Voir le paragraphe <em>Points des correspondances</em>.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.exampleBoxDark}>
          {correspondanceExampleImage && (
            <img 
              src={correspondanceExampleImage} 
              alt="Exemple correspondance" 
              style={styles.correspondanceExampleImg}
            />
          )}
          <div style={styles.exampleTextRight}>
            <p style={styles.exampleTextWhite}>
              <strong>Exemple :</strong> lors d'une manche, John relie sa ligne de métro rose à la station Pentagone par laquelle il était déjà passé lors d'une manche précédente avec sa ligne de métro verte.
            </p>
          </div>
        </div>

        <div style={styles.pointsSection}>
          <h2 style={styles.pointsSectionTitle}>POINTS GÉNÉRÉS PAR VOTRE LIGNE</h2>

          <div style={styles.pointsSubsection}>
            <h3 style={styles.pointsSubtitle}>ITINÉRAIRE DE LA LIGNE</h3>
            
            <div style={styles.scoringRow}>
              <div style={styles.scoringIconBox}>
                {districtsIconImage && (
                  <img 
                    src={districtsIconImage} 
                    alt="Icône quartiers" 
                    style={styles.scoringIconImage}
                  />
                )}
              </div>
              <p style={styles.scoringText}>
                Comptez d'abord le nombre de quartiers différents par lesquels passe votre ligne de métro : inscrivez ce nombre de quartiers dans la case correspondante.
              </p>
            </div>

            <div style={styles.reminderBox}>
              <p style={styles.reminderText}>
                <strong>Rappel :</strong> la ville de Londres est découpée en 13 quartiers différents: 9 quartiers principaux et 4 quartiers secondaires.
              </p>
            </div>

            <div style={styles.scoringRow}>
              <div style={styles.scoringIconBox}>
                {stationsIconImage && (
                  <img 
                    src={stationsIconImage} 
                    alt="Icône stations" 
                    style={styles.scoringIconImage}
                  />
                )}
              </div>
              <p style={styles.scoringText}>
                Repérez ensuite le quartier dans lequel votre ligne de métro passe par le plus grand nombre de stations. Inscrivez ce nombre de stations dans la case correspondante.
              </p>
            </div>
          </div>

          <div style={styles.pointsSubsection}>
            <h3 style={styles.pointsSubtitle}>TRAVERSÉES DE LA TAMISE</h3>
            
            <div style={styles.scoringRow}>
              <div style={styles.scoringIconBox}>
                {thamesIconImage && (
                  <img 
                    src={thamesIconImage} 
                    alt="Icône traversées Tamise" 
                    style={styles.scoringIconImage}
                  />
                )}
              </div>
              <div style={styles.scoringTextColumn}>
                <p style={styles.scoringText}>
                  Chaque section de métro qui traverse la Tamise vous rapporte 2 points.
                </p>
                <p style={styles.scoringText}>
                  Multipliez par 2 le nombre de sections de votre ligne qui traversent la Tamise et inscrivez ce résultat dans la case correspondante.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.pointsSubsection}>
            <h3 style={styles.pointsSubtitle}>SITES TOURISTIQUES DESSERVIS</h3>
            
            <div style={styles.touristSection}>
              <p style={styles.scoringText}>
                À la fin de chaque manche, comptez le nombre de sites touristiques par lesquels passe votre ligne de métro.
              </p>
              <p style={styles.scoringText}>
                Cochez autant de symboles sur votre échelle de score touristique. Vous comptabiliserez ainsi des points supplémentaires à la fin de la partie : voir la section <strong>FIN DU JEU</strong>.
              </p>
            </div>

            <div style={styles.exampleBoxPurple}>
              {touristExampleImage && (
                <img 
                  src={touristExampleImage} 
                  alt="Exemple sites touristiques" 
                  style={styles.touristExampleImage}
                />
              )}
              <p style={styles.exampleTextWhiteItalic}>
                <strong>Exemple :</strong> au cours de la première manche, John a fait passer sa ligne de métro verte par 2 sites touristiques. Il coche 2 symboles sur son échelle de score touristique.
              </p>
            </div>
          </div>

          <div style={styles.attentionBox}>
            <p style={styles.attentionText}>
              <strong>Attention :</strong> sur votre échelle de score touristique, vous pouvez cocher un maximum de 10 symboles pour remporter 25 points en fin de partie. Faire passer vos lignes de métros plus de 10 fois par des sites touristiques ne vous fera pas cocher de symboles supplémentaires.
            </p>
          </div>

          <div style={styles.totalSection}>
            <h3 style={styles.totalTitle}>TOTAL DES POINTS GÉNÉRÉS PAR VOTRE LIGNE DE MÉTRO</h3>
            <p style={styles.totalText}>
              Pour calculer le nombre total de points rapportés par votre ligne, multipliez le nombre de quartiers différents desservis par cette ligne, par le plus grand nombre de stations reliées entre elles dans un même quartier. Puis ajoutez à ce nombre vos points de traversées de la Tamise.
            </p>
          </div>

          <div style={styles.bigExampleBox}>
            {totalExampleImage && (
              <div style={styles.bigExampleLeft}>
                <img 
                  src={totalExampleImage} 
                  alt="Exemple calcul total des points" 
                  style={styles.totalExampleImage}
                />
              </div>
            )}
            <div style={styles.bigExampleRight}>
              <p style={styles.exampleTextWhiteItalic}>
                <strong>Exemple :</strong> John est passé dans 6 quartiers différents avec sa ligne de métro verte. Sur cette ligne, le quartier qui possède le maximum de stations reliées entre elles contient 3 stations connectées. Puis l'unique traversée de la Tamise lui rapporte 2 points.
              </p>
              <p style={styles.exampleTextWhiteItalic}>
                Le total de points générés par la ligne verte de John est donc de 20 points<br/>
                = 6 x 3 + 2.
              </p>
            </div>
          </div>
        </div>
          </>
        )}

        {/* ADVANCED MODE TAB */}
        {activeTab === "advanced" && (
          <>
        <div style={styles.advancedModeSection}>
          <div style={styles.advancedModeHeader}>
            <h2 style={styles.advancedModeTitle}>MODE DE JEU AVANCÉ</h2>
          </div>

          <div style={styles.advancedModeContent}>
            <p style={styles.advancedModeText}>
              En supplément des règles de base, vous pouvez jouer à <strong>Next Station London</strong> en mode avancé en ajoutant soit les cartes Objectif commun, soit les cartes Pouvoir de crayon, ou encore en associant ces deux types de cartes.
            </p>

            <h3 style={styles.advancedSubtitle}>Objectifs communs (5 cartes)</h3>

            <h4 style={styles.advancedSectionTitle}>MISE EN PLACE</h4>
            <ul style={styles.advancedList}>
              <li style={styles.advancedListItem}>
                Effectuez d'abord la mise en place du matériel comme indiqué dans les règles de base.
              </li>
              <li style={styles.advancedListItem}>
                Mélangez ensuite les 5 cartes Objectif commun face cachée, piochez-en 2 au hasard et placez-les face visible à côté de la pioche des cartes Station. Les cartes non utilisées sont remises dans la boîte.
              </li>
            </ul>

            <h4 style={styles.advancedSectionTitle}>DÉROULEMENT DU JEU</h4>
            <p style={styles.advancedModeText}>
              Les 2 cartes Objectif commun restent visibles pendant toute la partie. Elles constituent deux objectifs indépendants que chaque joueur peut réaliser au fil des 4 manches. Chaque objectif réalisé rapportera 10 points supplémentaires aux joueurs concernés lors du décompte final.
            </p>

            <h4 style={styles.advancedSectionTitle}>Description de chaque carte Objectif commun :</h4>

            <div style={styles.objectiveCard}>
              {interchangesBonusImage && (
                <img 
                  src={interchangesBonusImage} 
                  alt="8 correspondances différentes" 
                  style={styles.objectiveBonusImage}
                />
              )}
              <p style={styles.objectiveText}>
                Grâce à l'ensemble de vos lignes, réalisez 8 correspondances différentes par lesquelles passent au moins 2 de vos lignes de métro.
              </p>
            </div>

            <div style={styles.objectiveCard}>
              <p style={styles.objectiveText}>
                Grâce à l'ensemble de vos lignes, passez par au moins une station dans chacun des 13 quartiers de la ville.
              </p>
              {areasBonusImage && (
                <img 
                  src={areasBonusImage} 
                  alt="13 quartiers" 
                  style={styles.objectiveBonusImage}
                />
              )}
            </div>

            <div style={styles.objectiveCard}>
              {touristPlacesBonusImage && (
                <img 
                  src={touristPlacesBonusImage} 
                  alt="5 sites touristiques" 
                  style={styles.objectiveBonusImage}
                />
              )}
              <p style={styles.objectiveText}>
                Grâce à l'ensemble de vos lignes, passez par les 5 sites touristiques de la ville.
              </p>
            </div>

            <div style={styles.objectiveCard}>
              <p style={styles.objectiveText}>
                Grâce à l'ensemble de vos lignes, passez par les 9 stations du quartier central de la ville.
              </p>
              {centralAreaBonusImage && (
                <img 
                  src={centralAreaBonusImage} 
                  alt="9 stations du quartier central" 
                  style={styles.objectiveBonusImage}
                />
              )}
            </div>

            <div style={styles.objectiveCard}>
              {crossRiverBonusImage && (
                <img 
                  src={crossRiverBonusImage} 
                  alt="6 traversées de la Tamise" 
                  style={styles.objectiveBonusImage}
                />
              )}
              <p style={styles.objectiveText}>
                Grâce à l'ensemble de vos lignes, traversez au moins 6 fois la Tamise.
              </p>
            </div>

            <h4 style={styles.advancedSectionTitle}>DÉCOMPTE FINAL</h4>
            <ul style={styles.advancedList}>
              <li style={styles.advancedListItem}>
                Lors du décompte final, pour chaque Objectif commun que vous avez réalisé dans votre réseau, cochez une case « +10 » dans la zone de score correspondante.
              </li>
              <li style={styles.advancedListItem}>
                Ajoutez ainsi 10 points par objectif réalisé à votre total afin de déterminer votre score final.
              </li>
            </ul>

            <h3 style={styles.advancedSubtitle}>Pouvoir de crayon (4 cartes)</h3>

            <h4 style={styles.advancedSectionTitle}>MISE EN PLACE</h4>
            <ul style={styles.advancedList}>
              <li style={styles.advancedListItem}>
                Effectuez d'abord la mise en place du matériel comme indiqué dans les règles de base.
              </li>
              <li style={styles.advancedListItem}>
                Mélangez ensuite les 4 cartes Pouvoir face cachée, attribuez-en une au hasard à chaque crayon de couleur, puis retournez-les face visible à côté de chacun d'eux.
              </li>
              <li style={styles.advancedListItem}>
                <strong>→</strong> Dans une partie Solo, à 2 ou à 3 joueurs, attribuez également une carte Pouvoir à chaque crayon posé sur l'aire de jeu : vous utiliserez chaque crayon associé à sa carte lors des différentes manches de la partie.
              </li>
            </ul>

            <h4 style={styles.advancedSectionTitle}>DÉROULEMENT DU JEU</h4>
            <p style={styles.advancedModeText}>
              Chaque carte Pouvoir est associée à un seul et même crayon de couleur pour toute la partie. Chaque pouvoir est puissant mais vous ne pouvez l'utiliser qu'une seule fois par manche. De plus, un pouvoir est optionnel, vous n'êtes pas obligé de vous en servir.
            </p>
            <p style={styles.advancedModeText}>
              Une fois utilisée, retournez votre carte Pouvoir face cachée devant vous jusqu'à la fin de la manche.
            </p>

            <h4 style={styles.advancedSectionTitle}>Description de chaque carte Pouvoir :</h4>

            <div style={styles.powerCard}>
              <div style={styles.powerDescription}>
                <p style={styles.powerText}>
                  Lors d'un tour de jeu, tracez une seconde section de métro vers une station ayant le même symbole que la carte révélée par le contrôleur.
                </p>
                <p style={styles.powerTextYellow}>
                  <strong>Cas particulier :</strong> lorsque vous utilisez ce pouvoir après avoir révélé une carte Joker, tracez votre seconde section vers le même type de symbole que celui choisi pour votre première section lors de ce tour.
                </p>
              </div>
              {replayPowerImage && (
                <img 
                  src={replayPowerImage} 
                  alt="Pouvoir Rejouer" 
                  style={styles.powerBonusImage}
                />
              )}
            </div>

            <div style={styles.powerCard}>
              {noConstraintPowerImage && (
                <img 
                  src={noConstraintPowerImage} 
                  alt="Pouvoir Sans Contrainte" 
                  style={styles.powerBonusImage}
                />
              )}
              <p style={styles.powerText}>
                Considérez la carte Station révélée par le contrôleur lors de ce tour comme ayant le symbole Joker.
              </p>
            </div>

            <div style={styles.powerCard}>
              <p style={styles.powerText}>
                Considérez la carte Station révélée par le contrôleur lors de ce tour comme étant accompagnée de l'effet de la carte Aiguillage.
              </p>
              {derivationPowerImage && (
                <img 
                  src={derivationPowerImage} 
                  alt="Pouvoir Aiguillage" 
                  style={styles.powerBonusImage}
                />
              )}
            </div>

            <div style={styles.powerCard}>
              {multiplierPowerImage && (
                <img 
                  src={multiplierPowerImage} 
                  alt="Pouvoir Multiplicateur" 
                  style={styles.powerBonusImage}
                />
              )}
              <p style={styles.powerText}>
                À tout moment lors de cette manche, entourez une station de votre choix sur votre ligne de métro en cours de construction. Cette station comptera pour deux stations, au lieu d'une seule, lors du décompte des points générés par l'itinéraire de cette ligne.
              </p>
            </div>

            <div style={styles.multiplierExampleSection}>
              <div style={styles.multiplierExampleContent}>
                <p style={styles.multiplierExampleTitle}>
                  <em>Exemple : John pourrait entourer une station dans l'un des quartiers traversés par sa ligne verte. Ce pouvoir lui permettrait de comptabiliser un total de 4 stations connectées entre elles, au lieu de 3, dans ce quartier.</em>
                </p>
                {multiplierExampleImage && (
                  <img 
                    src={multiplierExampleImage} 
                    alt="Exemple multiplicateur" 
                    style={styles.multiplierExampleImage}
                  />
                )}
              </div>
              <p style={styles.multiplierExamplePoints}>
                Le total de points générés par la ligne verte de John serait alors de 26 points = 6 x 4 + 2.
              </p>
            </div>

            <div style={styles.attentionBoxPink}>
              <div style={styles.attentionIconPink}>▶</div>
              <p style={styles.attentionTextPink}>
                <strong>Attention, ce bonus est valable uniquement pour le décompte de la ligne construite lors de cette manche : il n'affecte pas vos autres lignes qui passent par cette station lors des autres manches.</strong>
              </p>
            </div>

            <div style={styles.timelineSection}>
              <div style={styles.timelineItem}>
                <div style={styles.timelineIconWhite}>⭘</div>
                <p style={styles.timelineText}>
                  À l'issue d'une manche, après avoir inscrit tous les points rapportés par votre ligne, chaque carte reste associée à son crayon lors de la phase « <span style={styles.preparePhase}>❹ Préparez-vous pour la ligne de métro suivante</span> ».
                </p>
              </div>
              <div style={styles.timelineItem}>
                <div style={styles.timelineIconWhite}>⭘</div>
                <p style={styles.timelineText}>
                  La partie se déroule de façon identique à celle du jeu de base jusqu'à l'issue de la quatrième manche.
                </p>
              </div>
            </div>
          </div>
        </div>
          </>
        )}

        {/* SOLO MODE TAB */}
        {activeTab === "solo" && (
          <>
        {/* MODE DE JEU SOLO */}
        <div style={styles.soloModeSection}>
          <div style={styles.soloModeHeader}>
            <h2 style={styles.soloModeTitle}>MODE DE JEU SOLO</h2>
          </div>

          <div style={styles.soloModeContent}>
            <p style={styles.soloModeIntro}>
              Vous pouvez jouer à Next Station London en solitaire.
            </p>

            <h3 style={styles.soloSectionTitle}>MISE EN PLACE</h3>
            
            <div style={styles.soloSetupItem}>
              <div style={styles.soloIconWhite}>⭘</div>
              <p style={styles.soloText}>
                Disposez les 4 crayons de couleur dans un ordre aléatoire sur votre aire de jeu.
              </p>
            </div>

            <div style={styles.soloSetupItem}>
              <div style={styles.soloArrowIcon}>➤</div>
              <p style={styles.soloText}>
                Si vous le souhaitez, vous pouvez également ajouter soit les <strong>cartes Objectif</strong>, soit les <strong>cartes Pouvoir de crayon</strong>, soit les deux types de cartes dans ce mode de jeu. Mettez alors en place chaque paquet choisi comme expliqué ci-dessus.
              </p>
            </div>

            <h3 style={styles.soloSectionTitle}>DÉROULEMENT DU JEU</h3>
            
            <p style={styles.soloText}>
              Toutes les règles sont identiques à celles du jeu de base.
            </p>

            <p style={styles.soloText}>
              L'ordre dans lequel les crayons sont disposés sur votre aire de jeu vous indique l'ordre dans lequel vous construirez chaque ligne de métro de la couleur correspondante.
            </p>

            <p style={styles.soloText}>
              Votre but est donc d'optimiser au mieux le tracé de votre réseau pour totaliser un score final le plus haut possible et remporter les félicitations du Maire !
            </p>

            <h3 style={styles.soloSectionTitle}>DÉCOMPTE FINAL</h3>
            
            <p style={styles.soloText}>
              Lorsque vous jouez avec le module <strong>cartes Objectif</strong>, avec le module <strong>Pouvoir de crayon</strong> ou avec les deux, soustrayez 10 points à votre score pour chaque module utilisé.
            </p>

            <p style={styles.soloText}>
              Determinez votre score final et recevez l'appréciation du Maire selon la réussite de votre mission.
            </p>

            <div style={styles.scoringGradesContainer}>
              {/* Score < 90 */}
              <div style={styles.gradeRowSimple}>
                <div style={styles.gradeScoreLabel}>&lt; 90</div>
                <div style={styles.gradeTextBoxRed}>
                  <p style={styles.gradeText}>
                    <strong>TERMINUS !</strong> Tout le monde descend ! Il va falloir vous releuer les manches et ne pas vous endormir entre deux stations !
                  </p>
                </div>
              </div>

              {/* Score 91-105 */}
              <div style={styles.gradeRowSimple}>
                <div style={styles.gradeScoreLabel}>91-105</div>
                <div style={styles.gradeTextBoxOrange}>
                  <p style={styles.gradeText}>
                    Tiens ! Vous vous êtes trompés de tunnel en cours de trajet ? Tentez à nouveau votre chance et prenez le bon aiguillage.
                  </p>
                </div>
              </div>

              {/* Score 106-120 */}
              <div style={styles.gradeRowSimple}>
                <div style={styles.gradeScoreLabel}>106-120</div>
                <div style={styles.gradeTextBoxYellow}>
                  <p style={styles.gradeTextYellow}>
                    Ça y est ! Votre projet est enfin sur les rails ! Continuez comme ça et vous deviendrez peut-être Chef de chantier !
                  </p>
                </div>
              </div>

              {/* Score 121-135 */}
              <div style={styles.gradeRowSimple}>
                <div style={styles.gradeScoreLabel}>121-135</div>
                <div style={styles.gradeTextBoxPurple}>
                  <p style={styles.gradeText}>
                    Et bien voilà un vrai conducteur de travaux ! Ça fait plaisir de voir autant de voyageurs satisfaits ! Vous y êtes presque.
                  </p>
                </div>
              </div>

              {/* Score 136-150 */}
              <div style={styles.gradeRowSimple}>
                <div style={styles.gradeScoreLabel}>136-150</div>
                <div style={styles.gradeTextBoxBlue}>
                  <p style={styles.gradeText}>
                    Décidement on ne vous arrête plus ! Le Maire va certainement vous embaucher pour étendre son réseau en dehors de la ville : BRAVO !
                  </p>
                </div>
              </div>

              {/* Score > 150 */}
              <div style={styles.gradeRowSimple}>
                <div style={styles.gradeScoreLabel}>&gt; 150</div>
                <div style={styles.gradeTextBoxGreen}>
                  <p style={styles.gradeText}>
                    Le réseau métropolitain n'a plus aucun secret pour vous ! Vous êtes l'expert du transport souterrain de la City ! FÉLICITATIONS !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  content: {
    backgroundColor: "rgb(149, 204, 245)",
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "95vw",
    maxHeight: "95vh",
    width: "850px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: "1.2",
    margin: 0,
    textTransform: "uppercase",
  },
  tabNavContainer: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    alignItems: "center",
    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
  },
  tabNav: {
    display: "flex",
    gap: "0.5rem",
    flex: 1,
  },
  tab: {
    flex: 1,
    padding: "0.8rem 1rem",
    fontSize: "1.3rem",
    fontWeight: "600",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "none",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#333",
    whiteSpace: "nowrap",
  },
  tabActive: {
    backgroundColor: "white",
    borderBottom: "3px solid #2E5C8A",
    color: "#2E5C8A",
  },
  scrollContainer: {
    overflowY: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    paddingRight: "0.5rem",
    paddingBottom: "2rem",
    flex: 1,
    minHeight: 0,
    maxHeight: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  yellowBox: {
    backgroundColor: "#F4E04D",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #333",
  },
  darkBlueBox: {
    backgroundColor: "#3D4A7C",
    color: "white",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #1A2340",
  },
  pinkBox: {
    backgroundColor: "#FFB5D5",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #C41E5B",
  },
  pinkTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "0.6rem",
    color: "#C41E5B",
  },
  purpleBox: {
    backgroundColor: "#D8BFD8",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #8B4789",
  },
  purpleTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "0.6rem",
    color: "#8B4789",
  },
  greenTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "0.6rem",
    color: "#2E7D32",
  },
  blueTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "0.6rem",
    color: "#1976D2",
  },
  textSmall: {
    fontSize: "1.3rem",
    lineHeight: "1.5",
    marginBottom: "0.4rem",
    fontStyle: "italic",
  },
  blueBox: {
    backgroundColor: "#A5D8F3",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
  },
  greenBox: {
    backgroundColor: "#B8E994",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #4A7C59",
  },
  boxTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "0.6rem",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "0.4rem",
  },
  subTitle: {
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "0.6rem",
  },
  text: {
    fontSize: "1.4rem",
    lineHeight: "1.5",
    marginBottom: "0.4rem",
  },
  list: {
    fontSize: "1.4rem",
    lineHeight: "1.5",
    paddingLeft: "1.5rem",
    margin: 0,
  },
  listItem: {
    marginBottom: "0.4rem",
  },
  orderedList: {
    fontSize: "1.4rem",
    lineHeight: "1.5",
    paddingLeft: "1.5rem",
    margin: 0,
    listStyleType: "decimal",
  },
  orderedItem: {
    marginBottom: "0.4rem",
    fontWeight: "600",
  },
  exampleSection: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "#2E3E5C",
    padding: "1.5rem",
    borderRadius: "8px",
  },
  exampleText: {
    flex: "0 0 45%",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  exampleImage: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
  },
  fullWidthImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  constructionSection: {
    width: "100%",
    margin: "1.5rem 0",
  },
  imageRow: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  exampleBox: {
    width: "100%",
    backgroundColor: "#2E3E5C",
    padding: "1rem",
    borderRadius: "8px",
    margin: "1rem 0",
    display: "flex",
    justifyContent: "center",
  },
  constructionRulesBox: {
    backgroundColor: "#A5D8F3",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  constructionTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2E3E5C",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  imagesRow: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    justifyContent: "center",
    margin: "1rem 0",
  },
  imageInRow: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "center",
  },
  smallImage: {
    maxWidth: "150px",
    height: "auto",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
  },
  smallerHeightImage: {
    maxWidth: "150px",
    maxHeight: "60px",
    width: "auto",
    height: "auto",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
  },
  constructionList: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    paddingLeft: "1.5rem",
    margin: "0.5rem 0",
    listStyleType: "disc",
  },
  constructionItem: {
    marginBottom: "0.8rem",
  },
  smallerImage: {
    maxWidth: "150px",
    height: "auto",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
  },
  exceptionText: {
    fontSize: "1.4rem",
    lineHeight: "1.5",
    marginTop: "0.5rem",
  },
  johnExampleContainer: {
    backgroundColor: "#2E3E5C",
    padding: "1.5rem",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    marginTop: "1rem",
  },
  exampleTextBox: {
    flex: "1",
    display: "flex",
    alignItems: "center",
  },
  exampleTextContent: {
    fontSize: "1.4rem",
    lineHeight: "1.5",
    color: "white",
    margin: 0,
  },
  johnExampleImage: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerImageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  largeImage: {
    maxWidth: "65%",
    height: "auto",
    borderRadius: "8px",
    border: "2px solid #2E5C8A",
  },
  specialStationsSection: {
    width: "100%",
    marginTop: "1.5rem",
  },
  specialStationsHeader: {
    backgroundColor: "#3D4A7C",
    padding: "1rem 1.5rem",
    borderRadius: "8px 8px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  specialStationsTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#A5D8F3",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  questionMarkIcon: {
    backgroundColor: "#A5D8F3",
    color: "#3D4A7C",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
    border: "3px solid white",
  },
  specialStationsContent: {
    backgroundColor: "#A5D8F3",
    padding: "1.5rem",
    borderRadius: "0 0 8px 8px",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  specialStationItem: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  stationIcon: {
    width: "60px",
    height: "60px",
    minWidth: "60px",
    flexShrink: 0,
  },
  stationDescription: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  stationText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#2E3E5C",
    margin: 0,
  },
  noteBox: {
    backgroundColor: "#7CB9E8",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "0.5rem",
  },
  noteText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  casParticulierBox: {
    backgroundColor: "#7CB9E8",
    padding: "1.2rem",
    borderRadius: "8px",
    marginTop: "1rem",
  },
  casParticulierText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  exampleBoxDark: {
    backgroundColor: "#3D4A7C",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1.5rem",
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  exampleLeftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    flex: "0 0 auto",
  },
  aiguillageCardColumn: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "flex-start",
  },
  aiguillageBoardColumn: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "flex-start",
  },
  aiguillageCardImage: {
    maxWidth: "100px",
    height: "auto",
    borderRadius: "8px",
  },
  aiguillageBoardImage: {
    maxWidth: "110px",
    height: "auto",
    borderRadius: "8px",
  },
  cardPlaceholder: {
    width: "150px",
    height: "100px",
    backgroundColor: "#2E3E5C",
    borderRadius: "8px",
  },
  boardPlaceholder: {
    width: "150px",
    height: "150px",
    backgroundColor: "#2E3E5C",
    borderRadius: "8px",
  },
  exampleRightColumn: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  exampleTextWhite: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  correspondancesSection: {
    backgroundColor: "#A5D8F3",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1.5rem",
  },
  correspondanceHeader: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  correspondanceIconImg: {
    width: "60px",
    height: "60px",
    minWidth: "60px",
    flexShrink: 0,
  },
  correspondanceIcon: {
    width: "60px",
    height: "60px",
    minWidth: "60px",
    backgroundColor: "white",
    borderRadius: "50%",
    border: "4px solid #3D4A7C",
    flexShrink: 0,
    position: "relative",
  },
  correspondanceDescription: {
    flex: "1",
  },
  correspondanceText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#2E3E5C",
    margin: 0,
  },
  correspondanceExampleImg: {
    maxWidth: "120px",
    height: "auto",
    borderRadius: "8px",
    flexShrink: 0,
  },
  exampleImageLeft: {
    width: "100px",
    height: "100px",
    backgroundColor: "#2E3E5C",
    borderRadius: "8px",
    flexShrink: 0,
  },
  exampleTextRight: {
    flex: "1",
  },
  pointsSection: {
    backgroundColor: "#B19CD9",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  pointsSectionTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    margin: 0,
    letterSpacing: "0.05em",
  },
  pointsSubsection: {
    backgroundColor: "#D8BFD8",
    padding: "1.2rem",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  pointsSubtitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#5B3A8A",
    textTransform: "uppercase",
    margin: 0,
    marginBottom: "0.5rem",
  },
  scoringRow: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  scoringIconBox: {
    flexShrink: 0,
  },
  scoringIconImage: {
    height: "50px",
    width: "auto",
    borderRadius: "8px",
  },
  scoringText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#5B3A8A",
    margin: 0,
  },
  scoringTextColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  reminderBox: {
    backgroundColor: "#5B3A8A",
    padding: "1rem",
    borderRadius: "8px",
  },
  reminderText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  touristSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  exampleBoxPurple: {
    backgroundColor: "#5B3A8A",
    padding: "1.2rem",
    borderRadius: "8px",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  touristExampleImage: {
    height: "50px",
    width: "auto",
    borderRadius: "8px",
    flexShrink: 0,
  },
  exampleTextWhiteItalic: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
    fontStyle: "italic",
  },
  attentionBox: {
    backgroundColor: "white",
    padding: "1.2rem",
    borderRadius: "8px",
    border: "3px solid #5B3A8A",
    marginTop: "1rem",
  },
  attentionText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#5B3A8A",
    margin: 0,
  },
  totalSection: {
    backgroundColor: "#D8BFD8",
    padding: "1.2rem",
    borderRadius: "8px",
    marginTop: "1rem",
  },
  totalTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#5B3A8A",
    textTransform: "uppercase",
    margin: 0,
    marginBottom: "0.8rem",
  },
  totalText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#5B3A8A",
    margin: 0,
  },
  bigExampleBox: {
    backgroundColor: "#5B3A8A",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1rem",
    display: "flex",
    gap: "1.5rem",
    alignItems: "flex-start",
  },
  bigExampleLeft: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "flex-start",
  },
  totalExampleImage: {
    maxWidth: "350px",
    height: "auto",
    borderRadius: "8px",
  },
  bigExampleRight: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  advancedModeSection: {
    marginTop: "1.5rem",
  },
  advancedModeHeader: {
    backgroundColor: "#F4E04D",
    padding: "1.5rem",
    borderRadius: "8px 8px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  advancedModeTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#E91E63",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  advancedModeContent: {
    backgroundColor: "#E91E63",
    padding: "1.5rem",
    borderRadius: "0 0 8px 8px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  advancedModeText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  advancedSubtitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#F4E04D",
    margin: "0.5rem 0",
  },
  advancedSectionTitle: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "white",
    textTransform: "uppercase",
    margin: "0.8rem 0 0.5rem 0",
  },
  advancedList: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    paddingLeft: "1.5rem",
    margin: "0.5rem 0",
    listStyleType: "disc",
    color: "white",
  },
  advancedListItem: {
    marginBottom: "0.5rem",
  },
  objectiveCard: {
    backgroundColor: "#F4E04D",
    padding: "1rem",
    borderRadius: "8px",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginTop: "0.8rem",
  },
  objectiveBonusImage: {
    height: "80px",
    width: "auto",
    borderRadius: "8px",
    flexShrink: 0,
  },
  objectiveText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#5B3A8A",
    margin: 0,
    flex: 1,
  },
  powerCard: {
    backgroundColor: "#8B2252",
    padding: "1rem",
    borderRadius: "8px",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginTop: "0.8rem",
  },
  powerDescription: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  powerText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  powerTextYellow: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "#F4E04D",
    margin: 0,
  },
  powerBonusImage: {
    height: "80px",
    width: "auto",
    borderRadius: "8px",
    flexShrink: 0,
  },
  multiplierExampleSection: {
    backgroundColor: "#A5387A",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  multiplierExampleContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.5rem",
  },
  multiplierExampleTitle: {
    fontSize: "1.6rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
    flex: 1,
  },
  multiplierExampleImage: {
    maxWidth: "300px",
    height: "auto",
    borderRadius: "8px",
    border: "3px solid #F4E04D",
    flexShrink: 0,
  },
  multiplierExamplePoints: {
    fontSize: "1.6rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
    textAlign: "left",
  },
  attentionBoxPink: {
    backgroundColor: "#A5387A",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1rem",
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  attentionIconPink: {
    fontSize: "2rem",
    color: "white",
    flexShrink: 0,
  },
  attentionTextPink: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  timelineSection: {
    backgroundColor: "#A5387A",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  timelineItem: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  timelineIconWhite: {
    fontSize: "2rem",
    color: "white",
    flexShrink: 0,
    lineHeight: "1.4",
  },
  timelineText: {
    fontSize: "1.4rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
    flex: 1,
  },
  preparePhase: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  soloModeSection: {
    borderRadius: "12px",
    overflow: "hidden",
    flexShrink: 0,
  },
  soloModeHeader: {
    backgroundColor: "#F4E04D",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  soloModeTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#C74B8E",
    margin: 0,
    textTransform: "uppercase",
  },
  soloModeContent: {
    backgroundColor: "#C74B8E",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  soloModeIntro: {
    fontSize: "1.8rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
    fontWeight: "500",
  },
  soloSectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "white",
    margin: "1rem 0 0.5rem 0",
    textTransform: "uppercase",
    textDecoration: "underline",
  },
  soloSetupItem: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  soloIconWhite: {
    fontSize: "2rem",
    color: "white",
    flexShrink: 0,
    lineHeight: "1.6",
  },
  soloArrowIcon: {
    fontSize: "2rem",
    color: "white",
    flexShrink: 0,
    lineHeight: "1.6",
  },
  soloText: {
    fontSize: "1.6rem",
    lineHeight: "1.6",
    color: "white",
    margin: 0,
  },
  scoringGradesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginTop: "1.5rem",
  },
  gradeRowSimple: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  gradeScoreLabel: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    minWidth: "90px",
    textAlign: "right",
    flexShrink: 0,
  },
  gradeTextBoxRed: {
    backgroundColor: "#8B3A3A",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  gradeTextBoxOrange: {
    backgroundColor: "#D87B35",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  gradeTextBoxYellow: {
    backgroundColor: "#E8C84D",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  gradeTextBoxPurple: {
    backgroundColor: "#6B5B8E",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  gradeTextBoxBlue: {
    backgroundColor: "#4A7BA7",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  gradeTextBoxGreen: {
    backgroundColor: "#5B8B5A",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  gradeText: {
    fontSize: "1.3rem",
    lineHeight: "1.4",
    color: "white",
    margin: 0,
  },
  gradeTextYellow: {
    fontSize: "1.3rem",
    lineHeight: "1.4",
    color: "white",
    margin: 0,
  },
  button: {
    padding: "1rem 2.5rem",
    fontSize: "1.6rem",
    minWidth: "180px",
    cursor: "pointer",
  },
  closeButton: {
    padding: "0.8rem 1.5rem",
    fontSize: "1.4rem",
    minWidth: "120px",
    cursor: "pointer",
    flexShrink: 0,
  },
};

export default RulesModal;
