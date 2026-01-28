import React, { useEffect, useState } from "react";
import "./campaignssection.scss";
import { FaChartLine, FaUsers } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { IoFootsteps } from "react-icons/io5";
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

  // Determinar la posición visual relativa al elemento activo
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
    </section>
  );
};

export default CampaignsSection;
