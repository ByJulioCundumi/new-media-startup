import React, { useState } from "react";
import {
  FaEdit,
  FaPalette,
  FaSyncAlt,
  FaTrash,
  FaSave,
  FaDownload,
} from "react-icons/fa";
import "./toolbarcv.scss";
import { GiBroom, GiMagicBroom } from "react-icons/gi";
import { LuEye } from "react-icons/lu";

const ToolbarCV: React.FC = () => {
  const [title, setTitle] = useState("Mi CV Profesional");
  const [editing, setEditing] = useState(false);

  const handleEditTitle = () => {
    setEditing(true);
  };

  const handleTitleBlur = () => {
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  return (
    <div className="cv-toolbar">
      {/* Left Side: Title */}
      <div className="cv-toolbar__left">
        {editing ? (
          <input
            className="cv-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <h2 className="cv-title">{title}</h2>
        )}

        <button className="icon-btn" onClick={handleEditTitle} title="Editar título">
          <FaEdit />
        </button>
      </div>

      {/* Right Side: Actions */}
      <div className="cv-toolbar__right">
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
        </button>

        <button className="cv-btn primary">
          <LuEye />
          Vista Previa
        </button>

        <button className="cv-btn success">
          <FaDownload />
          Descargar
        </button>
      </div>
    </div>
  );
};

export default ToolbarCV;
