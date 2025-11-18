import React from "react";
import { FaPalette, FaSyncAlt, FaDownload } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { LuEye } from "react-icons/lu";
import "./toolbarcv.scss";

const ToolbarButtons: React.FC = () => {
  return (
    <div className="cv-toolbar-wrapper">
      <div className="cv-toolbar-buttons">
        <button className="cv-btn ghost">
          <FaPalette />
          Colores
        </button>

        <button className="cv-btn ghost">
          <FaSyncAlt />
          Plantillas
        </button>

        <button className="cv-btn ghost">
          <GiBroom />
          Limpiar
        </button>
      </div>

      <div className="cv-toolbar-end">
          <button className="cv-btn icon-btn" title="Vista previa">
          <LuEye />
        </button>

        <button className="cv-btn icon-btn success" title="Descargar PDF">
          <FaDownload />
        </button>
        </div>
    </div>
  );
};

export default ToolbarButtons;
