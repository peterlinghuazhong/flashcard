import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function DeckManagement({ decks, setDecks, setSelectedDeck }) {
  const navigate = useNavigate(); // used to go to another page ("/study")

  // ======================
  // STATE (store user input)
  // ======================

  const [deckName, setDeckName] = useState(""); // input for new deck name
  const [front, setFront] = useState(""); // input for card front
  const [back, setBack] = useState(""); // input for card back

  // store selected deck ID (so we know which deck to edit)
  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem("selectedDeckId"); // get from browser
    return saved ? Number(saved) : null; // convert string → number
  });

  // ======================
  // EFFECT (runs when selectedId changes)
  // ======================

  useEffect(() => {
    // save selected deck ID to browser storage
    if (selectedId !== null) {
      localStorage.setItem("selectedDeckId", selectedId);
    }
  }, [selectedId]);

  // ======================
  // FUNCTION: ADD DECK
  // ======================
  const addDeck = () => {
    if (!deckName.trim()) return; // prevent empty deck name

    const newDeck = {
      id: Date.now(), // unique ID
      name: deckName, // deck name
      cards: [], // start with no cards
    };

    // add new deck into existing decks array
    setDecks([...decks, newDeck]);

    setDeckName(""); // clear input
  };

  // ======================
  // FUNCTION: SELECT DECK
  // ======================
  const selectDeck = (deck) => {
    setSelectedDeck(deck); // store full deck object (for UI)
    setSelectedId(deck.id); // store ID (for updating)
  };

  // ======================
  // FUNCTION: ADD CARD
  // ======================
  const addCard = () => {
    if (!front.trim() || !back.trim()) return; // prevent empty input

    // loop all decks and update the selected one
    const updated = decks.map((d) =>
      d.id === selectedId
        ? {
            ...d, // copy deck
            cards: [
              ...d.cards, // copy existing cards
              {
                id: Date.now(), // new card ID
                front,
                back,
                status: "new",
              },
            ],
          }
        : d,
    );

    setDecks(updated); // update all decks

    // update selected deck so UI refreshes
    setSelectedDeck(updated.find((d) => d.id === selectedId));

    setFront(""); // clear input
    setBack("");
  };

  // ======================
  // FUNCTION: DELETE DECK
  // ======================
  const deleteDeck = (id) => {
    // remove deck by filtering it out
    const updated = decks.filter((d) => d.id !== id);

    setDecks(updated);

    // if deleted deck was selected → reset selection
    if (selectedId === id) {
      setSelectedDeck(null);
      setSelectedId(null);
    }
  };

  // ======================
  // FUNCTION: DELETE CARD
  // ======================
  const deleteCard = (cardId) => {
    const updated = decks.map((d) =>
      d.id === selectedId
        ? {
            ...d,
            // remove card with matching ID
            cards: d.cards.filter((c) => c.id !== cardId),
          }
        : d,
    );

    setDecks(updated);

    // update selected deck UI
    setSelectedDeck(updated.find((d) => d.id === selectedId));
  };

  // ======================
  // FUNCTION: EDIT CARD
  // ======================
  const editCard = (card) => {
    // ask user for new values
    const newFront = prompt("Edit front:", card.front);
    const newBack = prompt("Edit back:", card.back);

    if (!newFront || !newBack) return; // cancel if empty

    const updated = decks.map((d) =>
      d.id === selectedId
        ? {
            ...d,
            // update only the selected card
            cards: d.cards.map((c) =>
              c.id === card.id ? { ...c, front: newFront, back: newBack } : c,
            ),
          }
        : d,
    );

    setDecks(updated);

    // refresh UI
    setSelectedDeck(updated.find((d) => d.id === selectedId));
  };

  // find currently selected deck
  const selectedDeck = decks.find((d) => d.id === selectedId);

  // ======================
  // UI (WHAT USER SEES)
  // ======================
  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">My Decks</h2>

      {/* ADD DECK */}
      <div className="card p-4 shadow mb-4">
        <input
          className="form-control mb-2"
          placeholder="Deck name..."
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)} // update state
        />
        <button className="btn btn-primary w-100" onClick={addDeck}>
          + Add Deck
        </button>
      </div>

      {/* SHOW ALL DECKS */}
      <div className="row">
        {decks.map((deck) => (
          <div key={deck.id} className="col-md-4 mb-3">
            <div className="card p-4 text-center shadow gap-2">
              <h5>{deck.name}</h5>
              <p>{deck.cards.length} cards</p>

              <button
                className="btn btn-success me-2"
                onClick={() => selectDeck(deck)}
              >
                Select
              </button>

              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  selectDeck(deck);
                  navigate("/study"); // go to study page
                }}
              >
                Study
              </button>

              <button
                className="btn btn-danger me-2"
                onClick={() => deleteDeck(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW SELECTED DECK */}
      {selectedDeck && (
        <div className="card p-4 shadow mt-4">
          <h5>Add Card to {selectedDeck.name}</h5>

          {/* ADD CARD */}
          <input
            className="form-control mb-2"
            placeholder="Front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="Back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />

          <button className="btn btn-success w-100 mb-3" onClick={addCard}>
            + Add Card
          </button>

          {/* CARD LIST */}
          <h6 className="fw-bold">Cards</h6>

          {selectedDeck.cards.length === 0 && <p>No cards yet</p>}

          {selectedDeck.cards.map((card) => (
            <div key={card.id} className="border p-3 mb-2 rounded">
              <p>
                <strong>Front:</strong> {card.front}
              </p>
              <p>
                <strong>Back:</strong> {card.back}
              </p>

              <button
                className="btn btn-warning me-2"
                onClick={() => editCard(card)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteCard(card.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeckManagement;
