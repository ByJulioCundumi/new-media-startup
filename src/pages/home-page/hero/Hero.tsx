
import "./hero.scss";
import JobOffer from "../../../components/job-offer/JobOffer";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">

        {/* LEFT */}
        <div className="hero__left">

          {/* BADGE */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Creador de CVs profesionales
          </div>

          {/* HEADING */}
          <div className="hero__heading">
            <h1 className="hero__headline">
              Diseña <span>Tus CVs Y</span> consigue empleo
            </h1>

            <p className="hero__subheadline">
              Crea tu CV en minutos con plantillas profesionales,
              personalización inteligente y descarga inmediata.
            </p>
          </div>

          {/* FEATURES */}
          <div className="hero__features-grid">
            <div className="hero__feature">
              <span>✔</span>
              <p>Plantillas profesionales</p>
            </div>

            <div className="hero__feature">
              <span>✔</span>
              <p>Personalización rápida</p>
            </div>

            <div className="hero__feature">
              <span>✔</span>
              <p>Compatible con ATS</p>
            </div>

            <div className="hero__feature">
              <span>✔</span>
              <p>Descarga inmediata</p>
            </div>
          </div>

          {/* TRUST */}
          <div className="hero__trust">
            Usado por <strong>miles de candidatos</strong> para conseguir entrevistas
          </div>

        </div>

        {/* RIGHT CTA */}
        <aside className="hero__cta">
          <div className="home-page__offer">
            <h2 className="home-page__job">
              ¡Trabaja <span>En Remoto!</span>
            </h2>

            <p>
              Recomienda nuestra plataforma y gana
              <strong> 50% de comisión</strong> con nuestro programa de afiliados.
            </p>

          </div>
            <JobOffer />
        </aside>

      </div>

      {/* WAVE */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="
              M0,50
              C240,100 480,0 720,30
              960,60 1200,100 1440,40
              L1440,100
              L0,100
              Z
            "
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
