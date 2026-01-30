import React, { useState } from "react";
import "./ChallengeInfo.scss";
import {
  FaUsers,
  FaVideo,
  FaDollarSign,
  FaClock,
  FaRegCommentDots,
  FaChartLine,
  FaStar,
  FaPercentage
} from "react-icons/fa";

type Section = "overview" | "video" | "comments" | "judges";

const judgesMock = [
  { id: 1, user: "alice", points: 120, voted: true },
  { id: 2, user: "mark", points: 80, voted: false },
  { id: 3, user: "luis", points: 40, voted: true }
];

const totalPoints = judgesMock.reduce((a, b) => a + b.points, 0);

const ChallengeInfo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  return (
    <section className="challenge-info">

      {/* NAV */}
      <nav className="challenge-info__tabs">
        <button onClick={() => setActiveSection("overview")} className={activeSection === "overview" ? "active" : ""}>
          <FaChartLine /> Resumen
        </button>
        <button onClick={() => setActiveSection("video")} className={activeSection === "video" ? "active" : ""}>
          <FaVideo /> Video
        </button>
        <button onClick={() => setActiveSection("comments")} className={activeSection === "comments" ? "active" : ""}>
          <FaRegCommentDots /> Comentarios
        </button>
        <button onClick={() => setActiveSection("judges")} className={activeSection === "judges" ? "active" : ""}>
          <FaUsers /> Jueces
        </button>
      </nav>

      {/* CONTENT */}
      <main className="challenge-info__main">

        {/* RESUMEN */}
        {activeSection === "overview" && (
          <section className="card">
            <span className="status status--open">Disponible</span>

            <div className="reward">
              <FaDollarSign /> $5 USD por video aprobado
            </div>

            <p className="description">
              Este reto fue financiado por la comunidad. Los usuarios que aportaron puntos
              participan como jueces y evalúan la calidad final del video.
            </p>

            <div className="stats-inline">
              <span><FaUsers /> 3 jueces</span>
              <span><FaVideo /> 1 video enviado</span>
              <span><FaClock /> 48h para votar</span>
            </div>

            <h4>Criterios de evaluación</h4>
            <ul>
              <li>Creatividad y originalidad</li>
              <li>Calidad visual y sonido</li>
              <li>Cumplimiento del reto</li>
            </ul>
          </section>
        )}

        {/* VIDEO */}
        {activeSection === "video" && (
          <section className="card">
            <h3>Video enviado</h3>

            <div className="video-status">
              <FaClock />
              <span>Votación abierta · 1 día 12h restantes</span>
            </div>

            <div className="video-placeholder">
              🎬 Vista previa del video
            </div>

            <button className="primary-btn">
              Evaluar calidad del video
            </button>
          </section>
        )}

        {/* COMMENTS */}
        {activeSection === "comments" && (
          <section className="card">
            <h3>Comentarios</h3>

            <div className="comment">
              <strong>@alice</strong>
              <p>La idea está buena, pero podría mejorar el encuadre.</p>
            </div>

            <div className="comment-input">
              <input placeholder="Escribe un comentario…" />
              <button>Publicar</button>
            </div>
          </section>
        )}

        {/* JUECES */}
        {activeSection === "judges" && (
          <section className="card">
            <h3>Jueces del reto</h3>
            <p className="muted">
              El peso del voto depende de los puntos aportados al reto.
            </p>

            <div className="judges-list">
              {judgesMock.map(judge => {
                const percent = Math.round((judge.points / totalPoints) * 100);
                return (
                  <div key={judge.id} className="judge-row">
                    <div className="judge-user">
                      <div className="avatar" />
                      <strong>@{judge.user}</strong>
                    </div>

                    <div className="judge-meta">
                      <span><FaStar /> {judge.points} pts</span>
                      <span><FaPercentage /> {percent}% voto</span>
                    </div>

                    <span className={`vote-status ${judge.voted ? "done" : "pending"}`}>
                      {judge.voted ? "Votó" : "Pendiente"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="vote-deadline">
              <FaClock /> Tiempo restante para votar: 48 horas
            </div>
          </section>
        )}

      </main>
    </section>
  );
};

export default ChallengeInfo;
