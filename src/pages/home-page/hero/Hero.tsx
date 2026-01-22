import React from "react";
import "./hero.scss";
import JobOffer from "../../../components/job-offer/JobOffer";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        {/* LEFT */}
        <div className="hero__left">
          <span className="hero__eyebrow">Creador de CVs profesionales</span>

          <h1 className="hero__headline">
            Diseña <span>currículums modernos</span> y logra <br /> más entrevistas
          </h1>

          <p className="hero__subheadline">
            Crea tu CV en minutos con plantillas profesionales,
            personalización inteligente y descarga inmediata.
          </p>

          <ul className="hero__features">
            <li>✔ Plantillas profesionales</li>
            <li>✔ Personalización rápida</li>
            <li>✔ Compatible con ATS</li>
            <li>✔ Descarga inmediata</li>
          </ul>
        </div>

        {/* CTA */}
        <aside className="hero__cta">
          <div className="home-page__offer">
                          <h2 className="home-page__job">
                            <span style={{ color: "#ffb120ff", fontWeight: "500" }}>
                                ¡Comparte y Gana!
                              </span>
                          </h2>
                          <p style={{textAlign: "center", color: "#818181ff"}}>Recomienda nuestra plataforma y gana 50% de comisión con nuestro programa de afiliados.</p>
                          
                          <JobOffer />
                        </div>
        </aside>
      </div>

      {/* WAVE */}
      <div className="hero__wave">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="
            M0,50
            C240,100 480,0 720,30
            960,60 1200,100 1440,40
            L1440,100
            L0,100
            Z
          " />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
