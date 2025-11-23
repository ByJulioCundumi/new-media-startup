import React, { useState } from "react";
import {
  FaPalette,
  FaSyncAlt,
  FaDownload,
  FaSave,
  FaBackspace,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { LuEye, LuScanQrCode } from "react-icons/lu";
import "./toolbarcv.scss";
import ColorFontPopup from "../color-font-popup/ColorFontPopup";
import { useDispatch } from "react-redux";
import { openPopup } from "../../reducers/colorFontSlice";
import { TbEdit, TbFileCv, TbReportAnalytics, TbScan } from "react-icons/tb";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";

const ToolbarCV: React.FC = () => {
  const dispatch = useDispatch();

  const [showQR, setShowQR] = useState(true);
  const [title, setTitle] = useState("Mi CV Profesional");
  const [editing, setEditing] = useState(false);

  // 🔥 Porcentaje del progreso (puede venir de props o store)
  const [progress] = useState(64);

  const handleEditTitle = () => setEditing(true);

  const handleSaveTitle = () => {
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  const handleTitleBlur = () => {
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  return (
    <div className="toolbar-cv-wrapper">
        <button className="toolbar-cv-btn ghost toolbar-cv-btn__back">
          <IoChevronBackOutline />
        </button>
      
      <div className="toolbar-cv-buttons">

        <button
          className="toolbar-cv-btn ghost"
          onClick={() => dispatch(openPopup())}
        >
          <FaPalette />
          Estilos
        </button>

        <button className="toolbar-cv-btn ghost">
          <FaSyncAlt />
          Plantillas
        </button>

        <button className="toolbar-cv-btn ghost">
          <TbScan />
          IA
        </button>
      </div>

      <div className="toolbar-cv-main">
        {/* ===== HEADER DEL CV ===== */}
      <div className="toolbar-cv-header">
        {editing ? (
          <input
            className="toolbar-cv-title-input editing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <h2 className="toolbar-cv-title">
            {title} <span><TbFileCv /> Tokyo</span>
          </h2>
        )}

        {editing ? (
          <button
            className="toolbar-cv-edit-btn save"
            onClick={handleSaveTitle}
            title="Guardar título"
          >
            <FaSave />
          </button>
        ) : (
          <button
            className="toolbar-cv-edit-btn"
            onClick={handleEditTitle}
            title="Editar título"
          >
            <TbEdit />
          </button>
        )}
      </div>

      {/* ===== NUEVA BARRA DE PROGRESO ===== */}
      <div className="toolbar-cv-progress">
        <div className="toolbar-cv-progress-bar">
          <div
            className="toolbar-cv-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="toolbar-cv-progress-label">{progress}%</span>
      </div>
      </div>

      {/* ===== BOTONES DERECHA ===== */}
      <div className="toolbar-cv-end">
        <button className="toolbar-cv-btn icon-btn">
          <GiBroom />
        </button>

        <button className="toolbar-cv-btn icon-btn qr-btn" title="Mostrar QR">
          <label className="toolbar-cv-switch">
            <LuScanQrCode />
            <input
              type="checkbox"
              checked={showQR}
              onChange={() => setShowQR(!showQR)}
            />
            <span className="toolbar-cv-slider" />
          </label>
        </button>

        <button className="toolbar-cv-btn icon-btn" title="Vista previa">
          <LuEye />
        </button>

        <button className="toolbar-cv-btn icon-btn success" title="Descargar PDF">
          <FaDownload />
        </button>

        <button className="toolbar-cv-btn ghost success">
          <FaSave /> Guardado
        </button>
      </div>

    </div>
  );
};

export default ToolbarCV;
