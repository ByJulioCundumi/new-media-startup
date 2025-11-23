import React, { useEffect, useMemo, useState } from "react";
import {
  FaPalette,
  FaSyncAlt,
  FaDownload,
  FaSave,
  FaBackspace,
  FaRegEyeSlash,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { LuEye, LuScanQrCode } from "react-icons/lu";
import "./toolbarcv.scss";
import ColorFontPopup from "../color-font-popup/ColorFontPopup";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../reducers/colorFontSlice";
import { TbEdit, TbFileCv, TbReportAnalytics, TbScan } from "react-icons/tb";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import type { IState } from "../../interfaces/IState";
import { setAllowQrCode } from "../../reducers/identitySlice";
import { FaRegFaceFrown, FaRegFaceGrimace, FaRegFaceMeh, FaRegFaceRollingEyes, FaRegFaceSmileBeam, FaRegFaceSurprise } from "react-icons/fa6";
import { BsEmojiSunglasses } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { togglePreviewPopup, toggleTemplatePopup } from "../../reducers/toolbarOptionSlice";

const ToolbarCV: React.FC = () => {
  const dispatch = useDispatch();
  const {allowQrCode} = useSelector((state:IState)=>state.identity)
  const [progress, setProgress] = useState(0);
  const cvSections = useSelector((state: IState) => state.cvSections);
  const {previewPopupOpen} = useSelector((state: IState) => state.toolbarOption);

  const [title, setTitle] = useState("Mi CV Profesional");
  const [editing, setEditing] = useState(false);

  const handleEditTitle = () => setEditing(true);
  const handleSaveTitle = () => {
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  const handleTitleBlur = () => {
    if (!title.trim()) setTitle("Mi CV Profesional");
    setEditing(false);
  };

  // Calcular progreso
useEffect(() => {
  const enabledSections = cvSections.sections.filter((s) => s.enabled);
  if (enabledSections.length === 0) {
    setProgress(0);
    return;
  }
  const total = enabledSections.reduce((acc, s) => acc + s.progress, 0);
  setProgress(Math.round(total / enabledSections.length));
}, [cvSections]);

// Clase de color unificada
const progressColorClass = useMemo(() => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue"; // 100%
}, [progress]);

const getProgressIcon = () => {
  if (progress < 17) return <FaRegFaceFrown className={`progress-icon ${progressColorClass}`} />;
  if (progress < 34) return <FaRegFaceGrimace className={`progress-icon ${progressColorClass}`} />;
  if (progress < 50) return <FaRegFaceRollingEyes className={`progress-icon ${progressColorClass}`} />;
  if (progress < 67) return <FaRegFaceMeh className={`progress-icon ${progressColorClass}`} />;
  if (progress < 84) return <FaRegFaceSurprise className={`progress-icon ${progressColorClass}`} />;
  if (progress < 99) return <FaRegFaceSmileBeam className={`progress-icon ${progressColorClass}`} />;
  return <BsEmojiSunglasses className={`progress-icon ${progressColorClass}`} />;
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

        <button onClick={()=> dispatch(toggleTemplatePopup())} className="toolbar-cv-btn ghost">
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
            <BiEditAlt />
          </button>
        )}
      </div>

        <div className="toolbar-cv-progress">
            {getProgressIcon()}
          <div className="toolbar-cv-progress-bar">
            <div
              className={`progress-bar-fill ${progressColorClass}`}
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
              checked={allowQrCode}
              onChange={() => dispatch(setAllowQrCode(!allowQrCode))}
            />
            <span className="toolbar-cv-slider" />
          </label>
        </button>

        <button onClick={()=> dispatch(togglePreviewPopup())} className="toolbar-cv-btn icon-btn" title="Vista previa">
          {previewPopupOpen ? <FaRegEyeSlash /> : <LuEye />} 
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
