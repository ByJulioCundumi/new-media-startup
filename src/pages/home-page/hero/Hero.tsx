
import "./hero.scss";
import JobOffer from "../../../components/job-offer/JobOffer";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">

        {/* LEFT */}
        <div className="hero__left">

          {/* HEADING */}
          <div className="hero__heading">
            <h1 className="hero__headline">
              Genera <span>Ingresos</span> Realizando <br /><span>Retos En Video</span>
            </h1>

            <p className="hero__subheadline">
              Selecciona el reto de tu interes
            </p>
          </div>

        </div>

        {/* RIGHT CTA */}
        <aside className="hero__cta">
          <div className="home-page__offer">
            <h2 className="home-page__job">
              ¡Gana <span> Como Afiliado!</span>
            </h2>

            <p>
              Obten un
              <strong> 34% de comisión</strong> por cada suscripcion referenciada.
            </p>

          </div>
            <JobOffer />
        </aside>

      </div>

    </section>
  );
};

export default Hero;
