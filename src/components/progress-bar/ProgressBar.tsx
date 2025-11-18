import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaSave } from "react-icons/fa";
import type { IState } from "../../interfaces/IState";
import "./progressbar.scss";
import { TbFileCv } from "react-icons/tb";

const ProgressBar: React.FC = () => {
  const [title, setTitle] = useState("Mi CV Profesional");
  const [editing, setEditing] = useState(false);
  const [progress, setProgress] = useState(0);

  const cvSections = useSelector((state: IState) => state.cvSections);

  const handleEditTitle = () => setEditing(true);

  const handleSaveTitle = () => {
    if (!title.trim()) {
      setTitle("Mi CV Profesional");
    }
    setEditing(false);
  };

  const handleTitleBlur = () => {
    // Mantener el título por defecto si queda vacío
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  // Calcular progreso en tiempo real
  useEffect(() => {
    const enabledSections = cvSections.filter((s) => s.enabled);
    if (enabledSections.length === 0) {
      setProgress(0);
      return;
    }

    const total = enabledSections.reduce((acc, s) => acc + s.progress, 0);
    setProgress(Math.round(total / enabledSections.length));
  }, [cvSections]);

  // Clase dinámica según el porcentaje
  const progressBarColorClass =
    progress < 50
      ? "progress-red"
      : progress < 100
      ? "progress-yellow"
      : "progress-blue";

  return (
    <div className="progressbar">
      <div className="progress-bar-container">
        
        {/* Header - Título editable */}
        <div className="progress-bar-header">
          {editing ? (
            <input
              className="progress-bar-title-input editing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              autoFocus
            />
          ) : (
            <h2 className="progress-bar-title">
              {title} <span> / <TbFileCv /> Clásico</span>
            </h2>
          )}

          {/* Botón dinámico: editar o guardar */}
          {editing ? (
            <button
              className="progress-bar-edit-btn save"
              onClick={handleSaveTitle}
              title="Guardar título"
            >
              <FaSave />
            </button>
          ) : (
            <button
              className="progress-bar-edit-btn"
              onClick={handleEditTitle}
              title="Editar título"
            >
              <FaEdit />
            </button>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${progressBarColorClass}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-bar-text">{progress}% completo</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
