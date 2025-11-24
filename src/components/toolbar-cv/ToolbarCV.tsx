import React, { useEffect, useMemo, useState } from "react";
import {
  FaPalette,
  FaSyncAlt,
  FaSave,
} from "react-icons/fa";
import { LuEye, LuScanQrCode, LuShoppingBasket } from "react-icons/lu";
import "./toolbarcv.scss";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../reducers/colorFontSlice";
import { TbEdit, TbFileCv, TbReportAnalytics, TbScan } from "react-icons/tb";
import { RiArrowGoBackLine, RiShoppingBagLine, RiVipLine } from "react-icons/ri";
import { IoChevronBackOutline, IoDiamond } from "react-icons/io5";
import type { IState } from "../../interfaces/IState";
import {
  FaRegFaceFrown,
  FaRegFaceGrimace,
  FaRegFaceMeh,
  FaRegFaceRollingEyes,
  FaRegFaceSmileBeam,
  FaRegFaceSurprise,
} from "react-icons/fa6";
import { BsEmojiSunglasses } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import {
  togglePreviewPopup,
  toggleTemplatePopup,
} from "../../reducers/toolbarOptionSlice";
import { HiShoppingCart } from "react-icons/hi2";
import ProfileAvatar from "../profile-avatar/ProfileAvatar";

const ToolbarCV: React.FC = () => {
  const dispatch = useDispatch();

  const { allowQrCode } = useSelector((state: IState) => state.identity);
  const cvSections = useSelector((state: IState) => state.cvSections);
  const { previewPopupOpen } = useSelector(
    (state: IState) => state.toolbarOption
  );

  // 🔹 Perfil del usuario (AJUSTA LOS NOMBRES SI TU STORE ES DIFERENTE)

  const [progress, setProgress] = useState(0);

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

  // ======================
  // CÁLCULO DE PROGRESO
  // ======================
  useEffect(() => {
    const enabledSections = cvSections.sections.filter((s) => s.enabled);
    if (enabledSections.length === 0) {
      setProgress(0);
      return;
    }
    const total = enabledSections.reduce((acc, s) => acc + s.progress, 0);
    setProgress(Math.round(total / enabledSections.length));
  }, [cvSections]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  const getProgressIcon = () => {
    if (progress < 17)
      return (
        <FaRegFaceFrown className={`progress-icon ${progressColorClass}`} />
      );
    if (progress < 34)
      return (
        <FaRegFaceGrimace className={`progress-icon ${progressColorClass}`} />
      );
    if (progress < 50)
      return (
        <FaRegFaceRollingEyes
          className={`progress-icon ${progressColorClass}`}
        />
      );
    if (progress < 67)
      return <FaRegFaceMeh className={`progress-icon ${progressColorClass}`} />;
    if (progress < 84)
      return (
        <FaRegFaceSurprise className={`progress-icon ${progressColorClass}`} />
      );
    if (progress < 99)
      return (
        <FaRegFaceSmileBeam className={`progress-icon ${progressColorClass}`} />
      );
    return (
      <BsEmojiSunglasses className={`progress-icon ${progressColorClass}`} />
    );
  };

  return (
    <div className="toolbar-cv-wrapper">
      {/* ===== BOTÓN RETROCESO ===== */}
      <button className="toolbar-cv-btn ghost toolbar-cv-btn__back">
        <IoChevronBackOutline />
      </button>

      {/* ===== BOTONES IZQUIERDA ===== */}
      <div className="toolbar-cv-buttons">
        <button
          className="toolbar-cv-btn ghost"
          onClick={() => dispatch(openPopup())}
        >
          <FaPalette />
          Estilos
        </button>

        <button
          onClick={() => dispatch(toggleTemplatePopup())}
          className="toolbar-cv-btn ghost"
        >
          <FaSyncAlt />
          Plantillas
        </button>

        <button className="toolbar-cv-btn ghost">
          <TbScan />
          IA
        </button>
      </div>

      {/* ===== PROGRESO ===== */}
      <div className="toolbar-cv-main">
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

      {/* ===== TÍTULO DEL CV ===== */}
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
            {title}{" "}
            <span>
              <TbFileCv /> Tokyo
            </span>
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

      {/* ===== PERFIL + VIP ===== */}
      <div className="toolbar-cv-end">
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default ToolbarCV;
