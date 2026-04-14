import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark p-3">
      <h3 className="text-white fw-bold">Language Learning Flashcards</h3>
      <div className="ms-auto">
        <Link to="/" className="btn btn-outline-light me-2">
          Decks
        </Link>
        <Link to="/study" className="btn btn-outline-light me-2">
          Study
        </Link>
        <Link to="/progress" className="btn btn-outline-light">
          Progress
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
