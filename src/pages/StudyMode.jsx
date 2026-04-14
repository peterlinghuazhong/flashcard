import { useState } from "react";

function StudyMode({ deck, updateStatus }) {
  // ======================
  // STATE
  // ======================
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [message, setMessage] = useState("");

  // ======================
  // SAFETY CHECK
  // ======================
  if (!deck || deck.cards.length === 0) {
    return (
      <h4 className="text-center mt-5 text-danger">
        No deck selected or no cards available
      </h4>
    );
  }

  // ======================
  // CURRENT CARD
  // ======================
  const card = deck.cards[index];

  // ======================
  // FLIP CARD
  // ======================
  const handleFlip = () => {
    setFlip(!flip);
  };

  // ======================
  // NEXT CARD
  // ======================
  const nextCard = () => {
    if (index < deck.cards.length - 1) {
      setIndex(index + 1);
      setFlip(false);
      setMessage("");
    } else {
      setMessage(" This is the last card!");
    }
  };

  // ======================
  // PREV CARD
  // ======================
  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlip(false);
      setMessage("");
    } else {
      setMessage("This is the first card!");
    }
  };

  // ======================
  // STATUS CLICK
  // ======================
  const handleStatusClick = (status) => {
    if (!card) {
      setMessage(" No card selected!");
      return;
    }

    updateStatus(card.id, status);

    if (status === "new") {
      setMessage(" Marked as Hard");
    } else if (status === "learning") {
      setMessage(" Marked as Learning");
    } else if (status === "mastered") {
      setMessage(" Marked as Easy");
    }

    // auto clear message after 2s
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="container text-center mt-5">
      {/* TITLE */}
      <h2 className="fw-bold mb-4 text-primary">📖 {deck.name}</h2>

      {/* CARD */}
      <div
        onClick={handleFlip}
        className="mx-auto shadow-lg rounded-4 d-flex align-items-center justify-content-center"
        style={{
          width: "350px",
          height: "200px",
          background: flip ? "#ff9a9e" : "#89f7fe",
          fontSize: "24px",
          cursor: "pointer",
          transition: "0.4s",
        }}
      >
        {flip ? card.back : card.front}
      </div>

      <p className="text-muted mt-2">Click card to flip</p>

      {/* STATUS BUTTONS */}
      <div className="mt-4">
        <button
          className="btn btn-danger me-2"
          onClick={() => handleStatusClick("new")}
        >
          New
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={() => handleStatusClick("learning")}
        >
          Learning
        </button>

        <button
          className="btn btn-success"
          onClick={() => handleStatusClick("mastered")}
        >
          mastered
        </button>
      </div>

      {/* MESSAGE */}
      {message && <p className="mt-3 fw-bold text-info">{message}</p>}

      {/* NAVIGATION */}
      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={prevCard}>
          ← Prev
        </button>

        <button className="btn btn-primary" onClick={nextCard}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default StudyMode;
