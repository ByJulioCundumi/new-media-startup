import { MdOutlineDiamond } from "react-icons/md";
import { templates } from "../../../templates/templates";
import "./hero.scss";
import { FaFileAlt, FaBolt, FaCheckCircle } from "react-icons/fa";
import { mockHomeTemplateData } from "../../../templates/mockHomeTemplateData";
import { Link } from "react-router-dom";

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
            <Link to={"/cvs"} className="hero__button hero__button--primary">
              Crear mi CV gratis
            </Link>
            <Link to={"/templates"} className="hero__button hero__button--secondary">
              Ver plantillas
            </Link>
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
          <div className="hero__cv-preview">
            <span className="tag-h"><MdOutlineDiamond size={15}/> Premium</span>
            <div className="hero__cv-scale">
              <TemplateComponent {...mockHomeTemplateData} />
            </div>
            <div className="hero__cv-line"></div>
          </div>
      </div>
    </section>
  );
}

export default Hero;
