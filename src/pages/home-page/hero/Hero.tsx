import { mockTemplateData } from "../../../templates/mockTemplateData";
import { templates } from "../../../templates/templates";
import "./hero.scss";
import { FaFileAlt, FaBolt, FaCheckCircle } from "react-icons/fa";

function Hero() {
  // Tomamos una plantilla cualquiera para el preview (ej: la primera)
  const TemplateComponent = templates[0].component;

  return (
    <section className="hero">
      <div className="hero__container">
        {/* ================= LEFT CONTENT ================= */}
        <div className="hero__content">
          <span className="hero__badge">
            Crea tu CV profesional en minutos
          </span>

          <h1 className="hero__title">
            Diseña un <span>currículum moderno</span> que destaque tu perfil
          </h1>

          <p className="hero__description">
            Genera currículums profesionales optimizados para reclutadores,
            listos para enviar y adaptados a cualquier oferta laboral.
          </p>

          <div className="hero__actions">
            <button className="hero__button hero__button--primary">
              Crear mi CV gratis
            </button>
            <button className="hero__button hero__button--secondary">
              Ver plantillas
            </button>
          </div>

          <ul className="hero__features">
            <li className="hero__feature">
              <FaCheckCircle /> Plantillas profesionales
            </li>
            <li className="hero__feature">
              <FaBolt /> Rápido y fácil
            </li>
            <li className="hero__feature">
              <FaFileAlt /> Descarga en PDF
            </li>
          </ul>
        </div>

        {/* ================= RIGHT CV PREVIEW ================= */}
        <div className="hero__visual">
          <div className="hero__cv-preview">
            <div className="hero__cv-scale">
              <TemplateComponent {...mockTemplateData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
