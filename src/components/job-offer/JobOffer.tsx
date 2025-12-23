import "./jobOffer.scss";
import {
  FaBriefcase,
  FaUsers,
  FaDollarSign,
  FaClock,
  FaGlobeAmericas,
  FaArrowRight,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";
import {
  TrendingUp,
  DollarSign as LucideDollar,
  Users,
  Sparkle,
} from "lucide-react";

const JobOffer = () => {

  return (
    <section className="job-offer-container">
      {/* ===== SIDEBAR IZQUIERDO (RESUMEN FIJO - ESTILO LINKEDIN) ===== */}
      <aside className="job-sidebar">
        <div className="sidebar-card">
          <div className="company-header">
            <div className="company-logo">
              <FaBriefcase />
            </div>
            <div>
              <h3 className="company-name">cvremoto.com</h3>
              <p className="company-tagline">CVs profesionales premium</p>
            </div>
          </div>

          <h1 className="job-title">Afiliado Promotor <br />(100% Remoto)</h1>

          <div className="job-badges">
            <span className="badge remote">🌍 Trabajo Remoto</span>
            <span className="badge no-exp">✨ Sin experiencia</span>
          </div>

          <div className="key-benefits">
            <div className="benefit-item">
              <LucideDollar className="icon" />
              <span>
                <strong>50% comisión recurrente</strong> en USD
              </span>
            </div>
            <div className="benefit-item">
              <FaChartBar className="icon" />
              <span>Ingresos pasivos mensuales</span>
            </div>
            <div className="benefit-item">
              <FaClock className="icon" />
              <span>Horario 100% flexible</span>
            </div>
            <div className="benefit-item">
              <FaGlobeAmericas className="icon" />
              <span>Desde cualquier país</span>
            </div>
          </div>

          <button className="apply-button primary">
            Aplicar ahora <FaArrowRight />
          </button>

          <div className="job-stats">
            <div className="stat">
              <FaUsers />
              <span>
                <strong>1.248</strong> personas ya aplicaron
              </span>
            </div>
            <div className="stat">
              <strong>312</strong> afiliados activos generando ingresos
            </div>
          </div>
        </div>
      </aside>

      {/* ===== CONTENIDO PRINCIPAL (ESTILO MODERNO + ANIMACIONES) ===== */}
      <main className="job-main-modern">
        <div className="hero-page">
          {/* HERO PRINCIPAL */}
          <section className="hero">
            <h1 className="hero-title">
              Trabaja Desde Casa
              <span>Sin Horarios Ni Jefes</span>
            </h1>

            <p className="hero-subtitle">
              Únete gratis al programa de afiliados y genera <strong>ingresos recurrentes del 50%</strong> 
              recomendando nuestra plataforma. Sin experiencia, sin horarios, sin inversión inicial.
            </p>

            <div className="cta-container">
              <button className="cta-button primary">
                Aplicar <FaArrowRight size={18} />
              </button>
              <button className="cta-button outline">
                Compartir Oferta
              </button>
            </div>
          </section>

          {/* BENEFICIOS ANIMADOS */}
          <section className="benefits">
            <h2 className="benefits-title">¿Por qué unirte como afiliado?</h2>

            <div className="benefit-grid">
              <div className="benefit-card" style={{ "--index": 0 } as React.CSSProperties}>
                <Sparkle className="icon" />
                <h3>Empieza sin invertir</h3>
                <p>Registro gratuito. No pagas nada para comenzar a ganar.</p>
              </div>

              <div className="benefit-card" style={{ "--index": 1 } as React.CSSProperties}>
                <Users className="icon" />
                <h3>Ideal para principiantes</h3>
                <p>No necesitas experiencia en marketing ni ventas.</p>
              </div>

              <div className="benefit-card" style={{ "--index": 2 } as React.CSSProperties}>
                <LucideDollar className="icon" />
                <h3>50% Comisión recurrente</h3>
                <p>Gana cada mes mientras tus referidos sigan activos.</p>
              </div>

              <div className="benefit-card" style={{ "--index": 3 } as React.CSSProperties}>
                <TrendingUp className="icon" />
                <h3>Demanda constante</h3>
                <p>Miles buscan mejorar su CV diariamente. Tú solo recomiendas.</p>
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          <section className="final-cta">
            <button className="cta-button large primary">
              <FaCheckCircle /> Quiero mi enlace de afiliado ahora
            </button>
            <p className="disclaimer">
              *Los ingresos dependen de tu esfuerzo y estrategia de promoción. 
              Muchos afiliados ya generan ingresos estables mes a mes.
            </p>
          </section>
        </div>
      </main>
    </section>
  );
};

export default JobOffer;