import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import DeckManagement from "./pages/DeckManagement";
import StudyMode from "./pages/StudyMode";
import ProgressTracking from "./pages/ProgressTracking";

function App() {
  // ======================
  // STATE: DECKS (MAIN DATA)
  // ======================

  // load decks from localStorage when app starts
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem("decks");

    // if data exists → convert JSON string to array
    // else → use default sample data
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "French",
            cards: [
              { id: 1, front: "Bonjour", back: "Hello", status: "new" },
              { id: 2, front: "Merci", back: "Thank you", status: "learning" },
            ],
          },
        ];
  });

  // ======================
  // EFFECT: SAVE TO LOCAL STORAGE
  // ======================

  useEffect(() => {
    // whenever decks change → save to browser
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  // ======================
  // STATE: SELECTED DECK
  // ======================

  const [selectedDeck, setSelectedDeck] = useState(null);
  // stores the current deck user is working on

  // ======================
  // FUNCTION: UPDATE CARD STATUS
  // ======================
  const updateStatus = (cardId, status) => {
    // loop through all decks
    const updated = decks.map((deck) =>
      deck.id === selectedDeck.id // find selected deck
        ? {
            ...deck, // copy deck
            cards: deck.cards.map((card) =>
              card.id === cardId
                ? { ...card, status } // update status
                : card,
            ),
          }
        : deck,
    );

    setDecks(updated); // update all decks

    // update selected deck so UI refreshes
    setSelectedDeck(updated.find((d) => d.id === selectedDeck.id));
  };

  // ======================
  // UI + ROUTING
  // ======================
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ======================
            PAGE: HOME (DECK MANAGEMENT)
           ====================== */}
        <Route
          path="/"
          element={
            <DeckManagement
              decks={decks} // pass all decks
              setDecks={setDecks} // allow child to update decks
              setSelectedDeck={setSelectedDeck} // allow selection
            />
          }
        />

        {/* ======================
            PAGE: STUDY MODE
           ====================== */}
        <Route
          path="/study"
          element={
            selectedDeck ? (
              // if deck selected → show study mode
              <StudyMode deck={selectedDeck} updateStatus={updateStatus} />
            ) : (
              // if no deck → show message
              <p className="text-center mt-5">Select a deck first</p>
            )
          }
        />

        {/* ======================
            PAGE: PROGRESS TRACKING
           ====================== */}
        <Route
          path="/progress"
          element={
            selectedDeck ? (
              <ProgressTracking deck={selectedDeck} />
            ) : (
              <p className="text-center mt-5">Select a deck first</p>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
