import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import useImage from "../../hooks/useImage";

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal = ({ onClose }: RulesModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const page1 = useImage("le-murmure-des-feuilles.rules.page1");
  const page2 = useImage("le-murmure-des-feuilles.rules.page2");
  const page3 = useImage("le-murmure-des-feuilles.rules.page3");
  const page4 = useImage("le-murmure-des-feuilles.rules.page4");
  const page5 = useImage("le-murmure-des-feuilles.rules.page5");
  const page6 = useImage("le-murmure-des-feuilles.rules.page6");
  const page7 = useImage("le-murmure-des-feuilles.rules.page7");
  const page8 = useImage("le-murmure-des-feuilles.rules.page8");

  const pages = [page1, page2, page3, page4, page5, page6, page7, page8];
  const totalPages = 8;

  // Reset scroll when page changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentImage = pages[currentPage - 1];

  return (
    <div style={styles.content}>
      <div style={styles.header}>
        <h2 style={styles.title}>Règles du jeu</h2>
        <Button onClick={onClose} style={styles.closeButton}>
          Fermer
        </Button>
      </div>

      <div style={styles.pageInfo}>
        Page {currentPage} / {totalPages}
      </div>

      <div ref={scrollContainerRef} style={styles.scrollContainer}>
        {currentImage && (
          <img 
            src={currentImage} 
            alt={`Règle page ${currentPage}`} 
            style={styles.ruleImage}
          />
        )}
      </div>

      <div style={styles.navigation}>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          style={{
            ...styles.navButton,
            ...(currentPage === 1 ? styles.navButtonDisabled : {}),
          }}
        >
          ← Précédent
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{
            ...styles.navButton,
            ...(currentPage === totalPages ? styles.navButtonDisabled : {}),
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  content: {
    backgroundColor: "#f5f5dc",
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: "1.2",
    margin: 0,
    textTransform: "uppercase",
    flex: 1,
    color: "#2d5016",
  },
  closeButton: {
    padding: "0.8rem 1.5rem",
    fontSize: "1.4rem",
    minWidth: "120px",
    cursor: "pointer",
    flexShrink: 0,
  },
  pageInfo: {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#2d5016",
  },
  scrollContainer: {
    overflowY: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    paddingRight: "0.5rem",
    paddingBottom: "1rem",
    flex: 1,
    minHeight: 0,
    maxHeight: "100%",
  },
  ruleImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  navigation: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    justifyContent: "space-between",
  },
  navButton: {
    padding: "0.8rem 1.5rem",
    fontSize: "1.4rem",
    fontWeight: "600",
    backgroundColor: "#4d7c2f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flex: 1,
    maxWidth: "200px",
  },
  navButtonDisabled: {
    backgroundColor: "#ccc",
    color: "#666",
    cursor: "not-allowed",
    opacity: 0.6,
  },
};

export default RulesModal;
