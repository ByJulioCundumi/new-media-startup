import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "./herosection.scss";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__container">

        {/* LEFT */} 
        <div className="hero-section__left">
          <h1 className="hero-section__title">
            Crea Tus Mejores CV Y {" "}
            <span className="typing">
                Logra {" "}
              <Typewriter
                words={[
                  "Destacar.",
                "Ser Elejido.",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={80}
                delaySpeed={3000}
              />
            </span>
          </h1>

          <p className="hero-section__subtitle">
            Diseña CV profesionales y optimizados con asistencia por IA, resaltando tus mejores habilidades y sorprende a los reclutadores.
          </p>

          <div className="hero-section__buttons">
            <button className="primary">Crear mi CV</button>
            <button className="secondary">Descargar en PDF</button>
          </div>

          <div className="hero-section__stats">
            <span className="hero-section__green">
              ✓ Incrementa Tus Posibilidades De Obtener Empleo
            </span>
            <span className="hero-section__reviews">
               Trabaja Con Nosotros | Gana en USD.
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-section__right float-animation">

          {/* Fondo circular */}
          <div className="hero-section__circle"></div>

          {/* CTA Card */}
          <div className="hero-section__card cta-card float-animation-delayed">
            {/* Avatar */}
          <div className="hero-section__photo">
            <img
              src="https://media.istockphoto.com/id/1146745072/photo/african-athletic-man-portrait.jpg?s=612x612&w=0&k=20&c=s5aMnbBNhFanlsgWGHG02fEb8qezqCIfphIGYWhG7ZU="
              alt="avatar"
            />
          </div>

            {/* Imagen de ejemplo de CV */}
            <div className="cta-card__image">
              <img
                src="https://resumesector.com/wp-content/uploads/2024/11/hero-image-3.png"
                alt="Ejemplo de CV"
              />
            </div>

            <div className="ats-tag">Descarga Tus CV</div>

            {/* Botón CTA */}
            <button className="cta-card__button">¡Generar Con IA!</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
