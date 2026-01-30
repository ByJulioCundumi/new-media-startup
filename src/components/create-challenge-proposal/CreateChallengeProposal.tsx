import React, { useState } from "react";
import "./CreateChallengeProposal.scss";
import {
  MdOutlineDescription,
  MdTimer,
} from "react-icons/md";
import { FaVideo, FaDollarSign, FaRocket } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

const CreateChallengeProposal: React.FC = () => {
  const [description, setDescription] = useState("");
  const [recordTime, setRecordTime] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [reward, setReward] = useState("5");
  const [deadline, setDeadline] = useState("");
  const [difficulty, setDifficulty] = useState("media");

  return (
    <section className="create-challenge">
      <header className="create-challenge__header">
        <h2 className="create-challenge__title">
          Propón un nuevo desafío
        </h2>
        <p className="create-challenge__subtitle">
          Crea un reto original para que otros usuarios lo completen en video.
        </p>
      </header>

      <form className="create-challenge__form">
        <div className="create-challenge__field">
          <label className="create-challenge__label">
            <MdOutlineDescription />
            Descripción del desafío
          </label>
          <textarea
            className="create-challenge__textarea"
            placeholder="Ej: Grábate haciendo un baile improvisado en un lugar público durante 30 segundos..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={280}
          />
          <span className="create-challenge__counter">
            {description.length}/280
          </span>
        </div>

        <div className="create-challenge__field">
          <label className="create-challenge__label">
            <MdTimer />
            Tiempo estimado para grabarlo
          </label>
          <input
            className="create-challenge__input"
            type="text"
            placeholder="Ej: 10 – 15 minutos"
            value={recordTime}
            onChange={(e) => setRecordTime(e.target.value)}
          />
        </div>

        <div className="create-challenge__field">
          <label className="create-challenge__label">
            <FaVideo />
            Duración esperada del video
          </label>
          <input
            className="create-challenge__input"
            type="text"
            placeholder="Ej: 20 – 40 segundos"
            value={videoDuration}
            onChange={(e) => setVideoDuration(e.target.value)}
          />
        </div>

        <div className="create-challenge__field">
          <label className="create-challenge__label">
            <IoCalendarOutline />
            Fecha límite para completar el reto
          </label>
          <input
            className="create-challenge__input"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="create-challenge__cta">
          <button className="create-challenge__button" type="submit">
            <FaRocket />
            Publicar desafío
          </button>
          <p className="create-challenge__hint">
            Tu desafío será visible para la comunidad y cualquier usuario podrá
            completarlo para ganar su recompensa.
          </p>
        </div>
      </form>
    </section>
  );
};

export default CreateChallengeProposal;
