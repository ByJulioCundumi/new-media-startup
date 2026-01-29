import React, { useEffect, useState } from "react";
import "./campaignssection.scss";
import { FaChartLine, FaUsers } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { mockProposals } from "../../util/challengesMock";
import ChallengeApproved from "../../components/challenge-approved/ChallengeApproved";

const CampaignsSection: React.FC = () => {
  const items = mockProposals;
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [total]);

  const getPositionClass = (i: number) => {
    const diff = (i - activeIndex + total) % total;

    if (diff === 0) return "item--center";
    if (diff === 1) return "item--right";
    if (diff === total - 1) return "item--left";
    if (diff === 2) return "item--right-back";
    if (diff === total - 2) return "item--left-back";
    return "item--hidden";
  };

  return (
    <section className="campaigns-section">
      {/* Cómo funciona */}
      <div className="how-it-works">
        <div className="how-it-works__header">
          <h2>¿Cómo funciona?</h2>
          <p>
            Proponer o completar un reto es simple. Sigue estos pasos y convierte
            desafíos reales en recompensas reales.
          </p>
        </div>

        <div className="how-it-works__steps">
          <div className="how-it-works__step">
            <span className="step-number">1</span>
            <h3>Explora los retos</h3>
            <p>
              Revisa los desafíos disponibles en la plataforma y elige el que más
              te motive completar.
            </p>
          </div>

          <div className="how-it-works__step">
            <span className="step-number">2</span>
            <h3>Completa el desafío</h3>
            <p>
              Graba tu video cumpliendo las reglas del reto y súbelo para
              validación por la comunidad.
            </p>
          </div>

          <div className="how-it-works__step">
            <span className="step-number">3</span>
            <h3>Validación en video</h3>
            <p>
              El reto es revisado y aprobado. Los videos válidos pasan al
              catálogo exclusivo.
            </p>
          </div>

          <div className="how-it-works__step highlight">
            <span className="step-number">4</span>
            <h3>Gana recompensas</h3>
            <p>
              Recibe tu recompensa y desbloquea nuevos retos con mayores
              beneficios.
            </p>
          </div>
        </div>

        <button className="propose-challenge-btnb">
            Explora Los Retos Disponibles
          </button>
      </div>
      

      {/* Carrusel tipo stack 3D */}
      <div className="campaigns-section__carousel-wrapper">
        <div className="campaigns-section__carousel">
          {items.map((challenge, i) => (
            <div
              key={challenge.id ?? i}
              className={`campaigns-section__item ${getPositionClass(i)}`}
            >
              <ChallengeApproved {...challenge} />
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="campaigns-section__stats">
        <div className="stat">
          <FaUsers className="stat__icon" />
          <div className="stat__info">
            <h3 className="stat__number">+8.2K</h3>
            <p className="stat__label">Usuarios participando</p>
          </div>
        </div>

        <div className="stat">
          <FaChartLine className="stat__icon" />
          <div className="stat__info">
            <h3 className="stat__number">+1.5K</h3>
            <p className="stat__label">Campañas activadas</p>
          </div>
        </div>

        <div className="stat">
          <MdRocketLaunch className="stat__icon" />
          <div className="stat__info">
            <h3 className="stat__number">+12.4K</h3>
            <p className="stat__label">Desafíos lanzados</p>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="campaigns-section__wave">
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

export default CampaignsSection;