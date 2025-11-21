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
import { useDispatch } from "react-redux";
import { openPopup } from "../../reducers/colorFontSlice";

const ToolbarCV: React.FC = () => {
  const dispatch = useDispatch()
  const [showQR, setShowQR] = useState(true);

  return (
    <div className="toolbar-cv-wrapper">
      <div className="toolbar-cv-buttons">

        {/* === ABRIR POPUP === */}
        <button
          className="toolbar-cv-btn ghost"
          onClick={()=> dispatch(dispatch(openPopup()))}
        >
          <FaPalette/>
          Editar
        </button>

        <button className="toolbar-cv-btn ghost">
          <FaSyncAlt />
          Plantillas
        </button>

        <button className="toolbar-cv-btn ghost">
          <GiBroom />
          
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
    </div>
  );
};

export default ToolbarCV;
