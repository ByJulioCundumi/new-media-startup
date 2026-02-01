import React, { useState } from "react";
import "./ChallengeInfo.scss";
import {
  FaUsers,
  FaVideo,
  FaDollarSign,
  FaClock,
  FaRegCommentDots,
  FaStar,
  FaPercentage,
  FaCheckCircle
} from "react-icons/fa";

type Section = "video" | "comments" | "judges";

const judgesMock = [
  { id: 1, user: "alice", points: 120, voted: true },
  { id: 2, user: "mark", points: 80, voted: false },
  { id: 3, user: "luis", points: 40, voted: true }
];

const totalPoints = judgesMock.reduce((a, b) => a + b.points, 0);

const ChallengeInfo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("video");

  return (
    <section className="challenge-info">

      {/* NAV */}
      <nav className="challenge-info__tabs">
        <button
          onClick={() => setActiveSection("video")}
          className={activeSection === "video" ? "active" : ""}
        >
          <FaVideo /> Video
        </button>
        <button
          onClick={() => setActiveSection("comments")}
          className={activeSection === "comments" ? "active" : ""}
        >
          <FaRegCommentDots /> Comentarios
        </button>
        <button
          onClick={() => setActiveSection("judges")}
          className={activeSection === "judges" ? "active" : ""}
        >
          <FaUsers /> Jueces
        </button>
      </nav>

      <main className="challenge-info__main">

        {/* VIDEO + INFO */}
        {activeSection === "video" && (
          <section className="card">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, accusamus.</p>

            <div className="video-placeholder">
              🎬 Vista previa del video
            </div>
          </section>
        )}

        {/* COMMENTS */}
        {activeSection === "comments" && (
          <section className="card">
            <h3>Comentarios</h3>

            <div className="comment">
              <div className="avatar" />
              <div>
                <strong>@alice</strong>
                <p>La idea está buena, pero podría mejorar el encuadre.</p>
              </div>
            </div>

            <div className="comment-input">
              <input placeholder="Escribe un comentario…" />
              <button>Publicar</button>
            </div>
          </section>
        )}

        {/* JUDGES */}
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
                  <div key={judge.id} className="judge-card">
                    <div className="judge-header">
                      <div className="judge-user">
                        <div className="avatar" />
                        <strong>@{judge.user}</strong>
                      </div>

                      {judge.voted && (
                        <span className="judge-voted">
                          <FaCheckCircle /> Votó
                        </span>
                      )}
                    </div>

                    <div className="judge-points">
                      <span><FaStar /> {judge.points} pts</span>
                      <span><FaPercentage /> {percent}%</span>
                    </div>

                    <div className="vote-bar">
                      <div
                        className="vote-bar__fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {!judge.voted && (
                      <span className="vote-pending">
                        <FaClock /> Pendiente de votar
                      </span>
                    )}
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
