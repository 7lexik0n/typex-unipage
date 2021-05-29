export default function Navbar({ title }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">{title}</span>
      </div>
    </nav>
  );
}