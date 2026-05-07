import { useState } from "react";
import "./App.css";
import pwLogo from "./assets/pw logo.png";

const simulations = [
  {
    id: "displacement",
    title: "Displacement Reaction",
    subtitle: "Iron & CuSO₄",
    description:
      "Watch iron displace copper from copper sulfate solution in real-time.",
    href: "/src/simulations/displacement_final.html",
    category: "Chemistry",
    difficulty: "Beginner",
    duration: "10 min",
  },
];

const CATEGORIES = ["All", "Chemistry", "Physics", "Biology"];

function SimCard({
  title,
  subtitle,
  description,
  href,
  category,
  difficulty,
  duration,
}) {
  return (
    <a className="sim-card" href={href} target="_blank" rel="noreferrer">
      <div className="sim-card-header">
        <span className={`sim-card-badge badge-${category.toLowerCase()}`}>
          {category}
        </span>
        <div className="sim-card-meta">
          <span>{difficulty}</span>
          <span className="dot">·</span>
          <span>{duration}</span>
        </div>
      </div>
      <h2 className="sim-card-title">{title}</h2>
      <p className="sim-card-sub">{subtitle}</p>
      <p className="sim-card-desc">{description}</p>
      <span className="sim-card-btn">Launch Simulation</span>
    </a>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = simulations.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="app">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <img src={pwLogo} alt="PW" className="brand-logo" />
          <span className="brand-text">ILE</span>
        </div>
        <div className="nav-links">
          <a href="#simulations">Simulations</a>
          <a href="#about">About</a>
          <a href="#simulations" className="nav-cta">
            Get Started
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="about">
        <h1 className="hero-title">
          <span className="hero-title-line">Interactive Learning</span>
          <span className="gradient-text">element.</span>
        </h1>
        <p className="hero-subtitle">
          Learn by doing. Explore chemistry, physics, and biology through
          <br />
          immersive, hands-on virtual experiments designed for students.
        </p>
        <div className="hero-actions">
          <a href="#simulations" className="btn-primary">
            Explore Simulations
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#about" className="btn-secondary">
            Learn More
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>10+</strong>
            <span>Simulations</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>3</strong>
            <span>Subjects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>Free</strong>
            <span>Forever</span>
          </div>
        </div>
      </section>

      {/* ── Simulations Section ── */}
      <section className="sims-section" id="simulations">
        <div className="section-header">
          <h2 className="section-title">Explore Simulations</h2>
          <p className="section-sub">
            Pick a simulation and start experimenting
          </p>
        </div>

        <div className="controls">
          <div className="search-wrap">
            <svg
              className="search-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search simulations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sim-grid">
          {filtered.length > 0 ? (
            filtered.map((s) => <SimCard key={s.id} {...s} />)
          ) : (
            <p className="no-results">
              No simulations found. More coming soon!
            </p>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand">
          <img src={pwLogo} alt="PW" className="brand-logo footer-logo" />
        </div>
        <p className="footer-tagline">
          Making science tangible, one simulation at a time.
        </p>
        <p className="footer-copy">© 2026 PW. Built for curious minds.</p>
      </footer>
    </div>
  );
}

export default App;
