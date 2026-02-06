import "./challengeInfo.scss";
import { useState } from "react";
import { FiThumbsUp, FiShare2, FiArrowLeft } from "react-icons/fi";
import { FaTimes, FaMedal } from "react-icons/fa";

const mockSupporters = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  username: `creator_${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
  points: Math.floor(Math.random() * 180) + 20,
}));

const ChallengeInfo = () => {
  const [comments, setComments] = useState([
    { id: 1, user: "Carlos", text: "Excelente reto 👏" },
    { id: 2, user: "Ana", text: "Muy buen video. ¡A por el 100%!" },
    { id: 3, user: "Diego", text: "Ya lo estoy intentando, está complicado 😅" },
  ]);

  const [newComment, setNewComment] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const selectedUser = mockSupporters.find((u) => u.id === selectedUserId);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), user: "Tú", text: newComment.trim() },
    ]);
    setNewComment("");
  };

  const handleBack = () => window.history.back();

  const handleSelectUser = (id: number) => {
    setSelectedUserId((prev) => (prev === id ? null : id));
  };

  const sortedSupporters = [...mockSupporters].sort((a, b) => b.points - a.points);
  const totalPoints = sortedSupporters.reduce((sum, u) => sum + u.points, 0);

  return (
    <div className="challenge-info">
      {/* Top bar */}
      <header className="challenge-info__header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft size={20} />
          <span>Regresar</span>
        </button>
      </header>

      <div className="challenge-info__container">
        {/* Main content */}
        <main className="challenge-info__main">
          {/* Video player */}
          <div className="video-player">
            <video
              controls
              poster="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200"
              className="video"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          {/* Video actions */}
          <div className="video-actions">
            <div className="video-stats">18,240 vistas • hace 3 días</div>
            <div className="video-buttons">
              <button className="action-btn">
                <FiThumbsUp size={18} /> <span>Me gusta</span>
              </button>
              <button className="action-btn">
                <FiShare2 size={18} /> <span>Compartir</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <section className="challenge-description">
            <h1 className="challenge-title">Reto: 100% Interés del Público</h1>
            <p>
              Completa el reto, alcanza el 100% de interés del público y valida tu video para
              venta dentro de la plataforma. El nivel de apoyo define el valor final del reto.
            </p>
          </section>

          {/* Comments section */}
          <section className="comments-section">
            <h2 className="comments-title">{comments.length} Comentarios</h2>

            <div className="comment-input-wrapper">
              <img
                src="https://i.pravatar.cc/48?u=you"
                alt="Tu avatar"
                className="comment-avatar"
              />
              <div className="comment-input-container">
                <input
                  placeholder="Añadir un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <button
                  className="publish-btn"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Publicar
                </button>
              </div>
            </div>

            <div className="comment-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img
                    src={`https://i.pravatar.cc/48?u=${comment.user}`}
                    alt={`${comment.user} avatar`}
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <strong>{comment.user}</strong>
                      <span className="comment-time">hace 2h</span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar - Supporters / Leaderboard */}
        <aside className="challenge-info__sidebar">
          <div className="interest-card">
            <div className="interest-header">
              <h3>Interés del público</h3>
              <span className="total-points">{totalPoints.toLocaleString()} pts</span>
            </div>

            {selectedUser && (
              <div className="selected-user">
                <img src={selectedUser.avatar} alt={selectedUser.username} />
                <div className="selected-info">
                  <strong>@{selectedUser.username}</strong>
                  <span>{selectedUser.points.toLocaleString()} pts aportados</span>
                </div>
                <button
                  className="close-selected"
                  onClick={() => setSelectedUserId(null)}
                  aria-label="Cerrar detalle"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div className="supporters-list">
              {sortedSupporters.map((user, index) => {
                const isTop3 = index < 3;
                return (
                  <div
                    key={user.id}
                    className={`supporter-row ${selectedUserId === user.id ? "active" : ""}`}
                    onClick={() => handleSelectUser(user.id)}
                  >
                    <div className="rank">
                      {isTop3 ? (
                        <FaMedal className={`medal medal-${index + 1}`} />
                      ) : (
                        <span className="rank-number">{index + 1}</span>
                      )}
                    </div>
                    <img src={user.avatar} alt={user.username} className="supporter-avatar" />
                    <div className="supporter-info">
                      <span className="username">@{user.username}</span>
                      <span className="points">{user.points.toLocaleString()} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ChallengeInfo;