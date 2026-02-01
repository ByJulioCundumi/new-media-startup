import "./hero.scss";
import JobOffer from "../../../components/job-offer/JobOffer";
import { TbInfoSquareRounded } from "react-icons/tb";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        {/* LEFT */}
        <div className="hero__left">
          <div className="hero__heading">
            <h1 className="hero__headline">
              Genera <span>Ingresos</span> Realizando <br />
              <span>Retos En Video</span>
            </h1>

            <p className="hero__subheadline">
              <TbInfoSquareRounded /> Descubre como funciona!
            </p>
          </div>
        </div>

        {/* RIGHT CTA */}
        <aside className="hero__cta">
          <div className="home-page__offer">
            <p>
              <strong>Obten un 34% de comisión</strong> por cada suscripcion
              referida.
            </p>
          </div>

          <JobOffer />
        </aside>
      </div>
    </section>
  );
};

export default Hero;
