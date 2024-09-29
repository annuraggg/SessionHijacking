import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-10 py-3 border-2">
      <Link to="/">Home</Link>
      <Link to="/attack1">Session Fixation</Link>
      <Link to="/attack2">XSS Attack</Link>
    </nav>
  );
};

export default Navbar;
