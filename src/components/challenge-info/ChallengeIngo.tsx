import React, { useState } from "react";
import "./ChallengeInfo.scss";
import {
  FaUsers,
  FaVideo,
  FaDollarSign,
  FaClock,
  FaRegCommentDots,
  FaChartLine
} from "react-icons/fa";

type Section = "overview" | "applicants" | "comments" | "activity";

const ChallengeInfo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  return (
    <section className="challenge-info">
      {/* TABS */}
      <nav className="challenge-info__tabs">
        {[
          { key: "overview", label: "Resumen", icon: <FaChartLine /> },
          { key: "applicants", label: "Aspirantes", icon: <FaUsers /> },
          { key: "comments", label: "Comentarios", icon: <FaRegCommentDots /> },
          { key: "activity", label: "Videos", icon: <FaVideo /> }
        ].map(tab => (
          <button
            key={tab.key}
            className={activeSection === tab.key ? "active" : ""}
            onClick={() => setActiveSection(tab.key as Section)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <div className="challenge-info__content">
        <main className="challenge-info__main">
          {activeSection === "overview" && (
            <section className="card">
              <span className="status status--open">Disponible</span>
                <span><FaDollarSign /> $5 USD por video aprobado</span>
              <p>
                Buscamos creadores con timing, originalidad y buena presencia en cámara.
                Los videos aprobados obtienen recompensa inmediata y visibilidad premium.
              </p>

              <div className="stats-inline">
                <span><FaUsers /> 42 aspirantes</span>
                <span><FaVideo /> 18 videos</span>
                <span><FaClock /> 3 días restantes</span>
              </div>

              <h4>Reglas</h4>
              <ul>
                <li>Formato vertical (9:16)</li>
                <li>Máximo 30 segundos</li>
                <li>Contenido original</li>
                <li>Sin marcas de agua</li>
              </ul>
            </section>
          )}

          {activeSection === "applicants" && (
            <section className="card">
              <h3>Aspirantes</h3>
              <div className="applicants-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="avatar-card">
                    <div className="avatar" />
                    <span>@creator{i + 1}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === "comments" && (
            <section className="card">
              <h3>Comentarios</h3>

              <div className="comment">
                <div className="avatar" />
                <div>
                  <strong>@juancreator</strong>
                  <p>¿Se puede usar música sin copyright?</p>
                </div>
              </div>

              <div className="comment-input">
                <input placeholder="Escribe un comentario…" />
                <button>Publicar</button>
              </div>
            </section>
          )}

          {activeSection === "activity" && (
            <section className="card">
              <h3>Actividad reciente</h3>
              <ul className="activity">
                <li>🎥 @laura subió un video</li>
                <li>✅ Video aprobado</li>
                <li>💬 Nuevo comentario</li>
              </ul>
            </section>
          )}
        </main>

      </div>
    </section>
  );
};

export default ChallengeInfo;
