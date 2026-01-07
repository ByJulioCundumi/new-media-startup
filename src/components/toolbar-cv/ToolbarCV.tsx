import React, { useEffect, useMemo, useState } from "react";
import {
  FaPalette,
  FaSyncAlt,
  FaSave,
} from "react-icons/fa";
import "./toolbarcv.scss";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDoneOutline, IoChevronBackOutline, IoDiamond, IoSaveOutline } from "react-icons/io5";
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
import {
  toggleTemplatePopup,
} from "../../reducers/toolbarOptionSlice";
import ProfileAvatar from "../profile-avatar/ProfileAvatar";
import { GiBroom } from "react-icons/gi";
import { resetIdentity } from "../../reducers/identitySlice";
import { resetEducation } from "../../reducers/educationSlice";
import { resetExperience } from "../../reducers/experienceSlice";
import { resetLanguage } from "../../reducers/languagesSlice";
import { resetSkills } from "../../reducers/skillsSlice";
import { resetProfile } from "../../reducers/profileSlice";
import { clearAllContacts } from "../../reducers/contactSlice";
import { clearAllPersonalInfo } from "../../reducers/personalInfoSlice";
import { clearAllLinks } from "../../reducers/linksSlice";
import { clearAllCourses } from "../../reducers/coursesSlice";
import { clearAllHobbies } from "../../reducers/hobbiesSlice";
import { clearAllReferences } from "../../reducers/referencesSlice";
import { clearAllAwards } from "../../reducers/awardsSlice";
import { clearAllCustom } from "../../reducers/customSlice";
import { resetCvSections } from "../../reducers/cvSectionsSlice";
import { Link, useNavigate } from "react-router-dom";
import { LuSave } from "react-icons/lu";
import { TbArrowAutofitContent } from "react-icons/tb";
import { RiArrowLeftRightFill } from "react-icons/ri";

const ToolbarCV: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hasUnsavedChanges, isSaving } = useSelector((state: IState) => state.cvSave);
  const cvSections = useSelector((state: IState) => state.cvSections);

  const [progress, setProgress] = useState(0);

  // ======================
  // FUNCIÓN PARA LIMPIAR CV CON CONFIRMACIÓN
  // ======================
  const handleClearCv = () => {
    const confirmClear = window.confirm(
      "⚠️ ¿Estás seguro de que quieres limpiar todo el CV?\n\n" +
      "Esta acción eliminará toda la información ingresada (experiencia, educación, habilidades, etc.) " +
      "y no se puede deshacer."
    );

    if (confirmClear) {
      dispatch(resetIdentity());
      dispatch(resetEducation());
      dispatch(resetExperience());
      dispatch(resetLanguage());
      dispatch(resetSkills());
      dispatch(resetProfile());
      dispatch(clearAllContacts());
      dispatch(clearAllPersonalInfo());
      dispatch(clearAllLinks());
      dispatch(clearAllCourses());
      dispatch(clearAllHobbies());
      dispatch(clearAllReferences());
      dispatch(clearAllAwards());
      dispatch(clearAllCustom());
      dispatch(resetCvSections());
    }
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

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "Tienes cambios sin guardar. ¿Estás seguro de que quieres volver ahora?"
      );

      if (!confirmLeave) {
        return;
      }
    }
    navigate("/cvs");
  };

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
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
      {/* ===== BOTÓN RETROCESO ===== */}
      <button
        onClick={handleBackClick}
        className="toolbar-cv-btn ghost toolbar-cv-btn__back"
        title="Volver a mis CVs"
      >
        <IoChevronBackOutline />
      </button>

      {/* ===== BOTONES IZQUIERDA ===== */}
      <div className="toolbar-cv-buttons">
        {/* BOTÓN LIMPIAR CV - CON CONFIRMACIÓN */}
        <button
          onClick={handleClearCv}
          title="Limpiar todo el CV"
          className="toolbar-cv-btn ghost"
        >
          <GiBroom />
        </button>

        {/* CAMBIAR PLANTILLA */}
        <button
          onClick={() => dispatch(toggleTemplatePopup())}
          className="toolbar-cv-btn ghost"
          title="Cambiar plantilla"
        >
          <RiArrowLeftRightFill />
          Plantillas
        </button>

        {/* ESTADO DE GUARDADO (solo visual) */}
        <button className="toolbar-cv-btn ghost" disabled>
          <LuSave />
          {hasUnsavedChanges ? (
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <IoCheckmarkDoneOutline style={{ color: "#18a077ff" }} />
          )}
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

      {/* ===== PERFIL + VIP ===== */}
      <div className="toolbar-cv-end">
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default ToolbarCV;