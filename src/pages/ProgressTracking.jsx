function ProgressTracking({ deck }) {
  // ======================
  // SAFE ACCESS (VERY IMPORTANT)
  // ======================
  // deck?.cards → if deck exists, get cards
  // || [] → if deck is null/undefined, use empty array
  const cards = deck?.cards || [];

  // ======================
  // COUNT CARDS BY STATUS
  // ======================

  // count cards where status === "new"
  const newCount = cards.filter((c) => c.status === "new").length;

  // count cards where status === "learning"
  const learningCount = cards.filter((c) => c.status === "learning").length;

  // count cards where status === "mastered"
  const masteredCount = cards.filter((c) => c.status === "mastered").length;

  // ======================
  // TOTAL CARDS
  // ======================
  const total = cards.length;

  // ======================
  // CALCULATE PROGRESS %
  // ======================
  // if no cards → 0%
  // else → (mastered / total) * 100
  const percent = total === 0 ? 0 : Math.round((masteredCount / total) * 100);

  // ======================
  // UI (DISPLAY)
  // ======================
  return (
    <div className="container mt-4">
      {/* TITLE */}
      {/* deck?.name → safe access (avoid crash) */}
      <h2 className="fw-bold mb-4">Progress: {deck?.name || "No Deck"}</h2>

      {/* ======================
          STATS CARDS
         ====================== */}
      <div className="row text-center mb-4">
        {/* NEW CARDS */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h5>New</h5>
            <h2 className="text-primary">{newCount}</h2>
          </div>
        </div>

        {/* LEARNING CARDS */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h5>Learning</h5>
            <h2 className="text-warning">{learningCount}</h2>
          </div>
        </div>

        {/* MASTERED CARDS */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h5>Mastered</h5>
            <h2 className="text-success">{masteredCount}</h2>
          </div>
        </div>
      </div>

      {/* ======================
          PROGRESS BAR
         ====================== */}
      <div className="card p-4 shadow-sm">
        <h5>Overall Progress</h5>

        <div className="progress mt-2">
          <div
            className="progress-bar"
            role="progressbar"
            // width depends on percentage
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>

        {/* MESSAGE WHEN NO CARDS */}
        {total === 0 && (
          <p className="text-muted mt-2">No cards yet — start adding some!</p>
        )}
      </div>
    </div>
  );
}

export default ProgressTracking;
