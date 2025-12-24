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
              <h3 className="company-name">Trabajo <span>(Remoto)</span> - Sin Experiencia</h3>
              <p className="company-tagline">cvremoto.com / Promotor, Vendedor</p>
            </div>
          </header>

          <p className="job-offer__info">Trabaja desde casa sin horarios promocionando nuestro creador de CVs. Postula enviandonos tu cv creado en nuestra 
            plataforma y comienza a ganar comisiones recurrentes de hasta el 70% .</p>

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
            *Solo CVs creados en cvremoto.com / Sin Marca De Agua
          </p>
        </aside>
      </article>
    </section>
  );
};

export default JobOffer;
