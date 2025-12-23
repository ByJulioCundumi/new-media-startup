import "./jobOffer.scss";
import {
  FaBriefcase,
  FaUsers,
  FaClock,
  FaGlobeAmericas,
  FaArrowRight,
  FaChartBar,
  FaDollarSign,
  FaLaptopHouse,
  FaUserCheck,
} from "react-icons/fa";

const JobOffer = () => {
  return (
    <section className="job-offer-card-container">
      <article className="job-offer-card">
        {/* CONTENIDO */}
        <div className="job-content">
          {/* Empresa */}
          <header className="company-header">
            <div className="company-logo">
              <FaBriefcase />
            </div>
            <div className="company-info">
              <h3 className="company-name">Promotor - Sin Experiencia</h3>
              <p className="company-tagline">www.cvremoto.com</p>
            </div>
          </header>

          <p className="job-offer__info">Trabaja desde casa sin horarios, postula enviando un cv sin marca de agua creado desde nuestra plataforma y comienza a ganar comisiones de hasta el 70%.</p>

          {/* Estadísticas */}
          <div className="job-stats">
            <span>
              <FaUsers />
              <strong>1.248</strong> Postulados Aceptados
            </span>
          </div>
        </div>

        {/* CTA */}
        <aside className="job-action">
          <button className="apply-button">
            Envia tu CV <FaArrowRight />
          </button>
          <p className="action-note">
            Crea y envia un cv premium para postular
          </p>
        </aside>
      </article>
    </section>
  );
};

export default JobOffer;
