import "./profile.scss";
import { FiShare2, FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const user = {
    name: "Julio Cundumi",
    username: "julio_creator",
    bio: "Creador de retos y contenido. Conecto ideas con acción y convierto el interés en resultados reales.",
    avatar: "https://i.pravatar.cc/300?img=12",
    stats: {
      challenges: 24,
      videos: 18,
      supporters: 320,
    },
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link de perfil copiado");
  };

  const handleEdit = () => {
    alert("Abrir edición de perfil");
  };

  return (
    <div className="profile">

      <div className="profile__card">

        {/* LEFT */}
        <div className="profile__left">
          <img className="profile__avatar" src={user.avatar} alt="avatar" />

          <div className="profile__info">
            <h2>{user.name}</h2>
            <span>@{user.username}</span>
            <p className="profile__bio">{user.bio}</p>
          </div>
        </div>

        {/* CENTER STATS */}
        <div className="profile__stats">
          <div>
            <strong>{user.stats.challenges}</strong>
            <span>Retos Activos</span>
          </div>

          <div>
            <strong>{user.stats.videos}</strong>
            <span>Retos Completados</span>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="profile__actions">
          <button className="shareBtn" onClick={handleShare}>
            <FiShare2 /> Compartir
          </button>

          <button className="editBtn" onClick={handleEdit}>
            <FiEdit2 /> Editar perfil
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
