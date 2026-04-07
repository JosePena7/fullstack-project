

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>My App</h2>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;