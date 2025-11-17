import React, { useState } from "react";
import {
  FaEdit,
  FaPalette,
  FaSyncAlt,
  FaDownload,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { LuEye } from "react-icons/lu";
import "./toolbarcv.scss";

const ToolbarCV: React.FC = () => {
  const [title, setTitle] = useState("Mi CV Profesional");
  const [editing, setEditing] = useState(false);
  const [progress, setProgress] = useState(40);

  const handleEditTitle = () => {
    setEditing(true);
  };

  const handleTitleBlur = () => {
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  return (
    <div className="cv-toolbar">
      <div className="cv-toolbar__top">
        <div className="cv-header">
        {editing ? (
          <input
            className="cv-title-input editing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <h2 className="cv-title">{title}</h2>
        )}

        <button
          className="icon-btn edit-title"
          onClick={handleEditTitle}
          title="Editar título"
        >
          <FaEdit />
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-text">{progress}% completo</span>
      </div>
      </div>

      <div className="cv-actions">
        <button className="cv-btn">
          <FaPalette />
          Colores
        </button>

        <button className="cv-btn">
          <FaSyncAlt />
          Plantillas
        </button>

        <button className="cv-btn">
          <GiBroom />
          Limpiar
        </button>

        <button className="cv-btn primary">
          <LuEye />
        </button>

        <button className="cv-btn success">
          <FaDownload />
        </button>
      </div>
    </div>
  );
};

export default ToolbarCV;
