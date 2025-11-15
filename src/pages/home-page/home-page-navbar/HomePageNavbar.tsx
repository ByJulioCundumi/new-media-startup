import React, { useState } from "react";
import "./homePageNavbar.scss";

const HomePageNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuOptions = ["Inicio", "Trabaja Con Nosotros", "Plantillas CV", "Precios"];
  const [activeOption, setActiveOption] = useState("Inicio"); // ← por defecto

  return (
    <nav className="home-page-navbar">
      <div className="home-page-navbar__content">

        {/* LOGO */}
        <div className="home-page-navbar__logo">
          <div className="logo-icon"></div>
          <span className="logo-text">CVBuilder</span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="home-page-navbar__links">
          {menuOptions.map((opt) => (
            <li
              key={opt}
              className={activeOption === opt ? "active" : ""}
              onClick={() => setActiveOption(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>

        {/* ACTION BUTTONS */}
        <div className="home-page-navbar__actions">
          <button className="login">Iniciar sesión</button>
          <button className="signup">Crear cuenta</button>
        </div>

        {/* HAMBURGER BUTTON */}
        <div
          className={`home-page-navbar__hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`home-page-navbar__mobile ${menuOpen ? "open" : ""}`}>
        <ul>
          {menuOptions.map((opt) => (
            <li
              key={opt}
              className={activeOption === opt ? "active" : ""}
              onClick={() => {
                setActiveOption(opt);
                setMenuOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>

        <div className="mobile-buttons">
          <button className="signup">Iniciar Sesion</button>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
