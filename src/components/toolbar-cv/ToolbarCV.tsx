import React, { useEffect, useMemo, useState } from "react";
import {
  FaPalette,
  FaSyncAlt,
  FaSave,
} from "react-icons/fa";
import "./toolbarcv.scss";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDoneOutline, IoChevronBackOutline, IoDiamond, IoSave, IoSaveOutline } from "react-icons/io5";
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
  const navigate = useNavigate()

  const { hasUnsavedChanges, isSaving } = useSelector((state: IState) => state.cvSave);
  const cvSections = useSelector((state: IState) => state.cvSections);

  const clearCv = ()=>{
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

  // 🔹 Perfil del usuario (AJUSTA LOS NOMBRES SI TU STORE ES DIFERENTE)

  const [progress, setProgress] = useState(0);

  

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
        "Se estan guardando los cambios realizados ¿Estás seguro de que quieres volver ahora?"
      );

      if (!confirmLeave) {
        return; // Cancela la navegación
      }
    }

    // Si no hay cambios o el usuario confirma → navegar
    navigate("/cvs");
  };

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
      <button
        onClick={handleBackClick}
        className="toolbar-cv-btn ghost toolbar-cv-btn__back"
        title="Volver a mis CVs"
      >
        <IoChevronBackOutline />
      </button>

      {/* ===== BOTONES IZQUIERDA ===== */}
      <div className="toolbar-cv-buttons">
        <button onClick={clearCv} title="Limpiar cv" className="toolbar-cv-btn ghost">
          <GiBroom />
        </button>
        
        <button
          onClick={() => dispatch(toggleTemplatePopup())}
          className="toolbar-cv-btn ghost"
        >
          <RiArrowLeftRightFill />
          Plantillas
        </button>


        <button onClick={clearCv} className="toolbar-cv-btn ghost">
          <LuSave /> 
          {
            !hasUnsavedChanges === true ? <IoCheckmarkDoneOutline />
            :
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          }
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
