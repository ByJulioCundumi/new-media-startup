import React, { useState } from "react";
import {
  FaPalette,
  FaSyncAlt,
  FaDownload,
  FaSave,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { LuEye, LuScanQrCode } from "react-icons/lu";
import "./toolbarcv.scss";
import ColorFontPopup from "../color-font-popup/ColorFontPopup";

const ToolbarCV: React.FC = () => {
  const [showQR, setShowQR] = useState(true);

  // === POPUP ===
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cvColor, setCvColor] = useState("#1E88E5");
  const [cvFont, setCvFont] = useState("Roboto");

  return (
    <div className="toolbar-cv-wrapper">
      <div className="toolbar-cv-buttons">

        {/* === ABRIR POPUP === */}
        <button
          className="toolbar-cv-btn ghost"
          onClick={() => setIsPopupOpen(true)}
        >
          <FaPalette />
          Editar
        </button>

        <button className="toolbar-cv-btn ghost">
          <FaSyncAlt />
          Plantillas
        </button>

        <button className="toolbar-cv-btn ghost">
          <GiBroom />
          Limpiar
        </button>
      </div>

      <div className="toolbar-cv-end">

        {/* === BOTÓN QR + SWITCH === */}
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
          <FaSave /> Guardar
        </button>
      </div>

      {/* === POPUP COLOR & FUENTE === */}
      <ColorFontPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        selectedColor={cvColor}
        onColorChange={setCvColor}
        selectedFont={cvFont}
        onFontChange={setCvFont}
      />
    </div>
  );
};

export default ToolbarCV;
