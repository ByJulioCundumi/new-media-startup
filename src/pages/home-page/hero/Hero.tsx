
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
            Acepta El Reto!
          </div>

          {/* HEADING */}
          <div className="hero__heading">
            <h1 className="hero__headline">
              Genera <span>Ingresos</span> Realizando <br /><span>Retos En Video</span>
            </h1>

            <p className="hero__subheadline">
              Completa los retos de tu interes, entrega sus videos y recibe los pagos por tu trabajo.
            </p>
          </div>

          {/* FEATURES */}
          <div className="hero__features-grid">
            <div className="hero__feature">
              <span>✔</span>
              <p>Crea Tu Cuenta Gratis</p>
            </div>

            <div className="hero__feature">
              <span>✔</span>
              <p>Descrubre Videos Único</p>
            </div>

            <div className="hero__feature">
              <span>✔</span>
              <p>Propon Nuevos Retos</p>
            </div>

            <div className="hero__feature">
              <span>✔</span>
              <p>Accede A Contenido Exclusivo</p>
            </div>
          </div>

          {/* TRUST */}
          <div className="hero__trust">
            Únete a <strong>nuestra plataforma</strong> y disfruta nuestro contenido.
          </div>

        </div>

        {/* RIGHT CTA */}
        <aside className="hero__cta">
          <div className="home-page__offer">
            <h2 className="home-page__job">
              ¡Comparte <span> Y Gana!</span>
            </h2>

            <p>
              Recomienda nuestra plataforma y gana
              <strong> 50% de comisión</strong> con nuestro progarama de afiliados.
            </p>

          </div>
            <JobOffer />
        </aside>

      </div>

      {/* WAVE */}
      <div className="hero__wave">
  <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
    <path
      d="
        M0,100
        C150,0 300,200 450,100
        C600,0 750,200 900,100
        C1050,0 1200,200 1350,100
        L1440,160
        L0,160
        Z
      "
    />
  </svg>
</div>

    </section>
  );
};

export default Hero;
