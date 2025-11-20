import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { FaSave } from "react-icons/fa";
import type { IState } from "../../interfaces/IState";
import "./progressbar.scss";
import { TbFileCv } from "react-icons/tb";
import { MdEditNote, MdModeEditOutline } from "react-icons/md";
import { FaRegFaceFrown, FaRegFaceGrimace, FaRegFaceMeh, FaRegFaceRollingEyes, FaRegFaceSmileBeam, FaRegFaceSurprise } from "react-icons/fa6";
import { BsEmojiSunglasses } from "react-icons/bs";
import { RiEditFill, RiFileEditLine } from "react-icons/ri";

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

  const progressBarColorClass =
    progress < 50
      ? "progress-red"
      : progress < 100
      ? "progress-yellow"
      : "progress-blue";

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue"; // 100%
  }, [progress]);


  const getProgressIcon = () => {
  if (progress < 17)
    return <FaRegFaceFrown className={`progress-icon ${progressColorClass}`} />; // Muy triste

  if (progress < 34)
    return <FaRegFaceGrimace className={`progress-icon ${progressColorClass}`} />; // Triste

  if (progress < 50)
    return <FaRegFaceRollingEyes className={`progress-icon ${progressColorClass}`} />; // Decepcionado

  if (progress < 67)
    return <FaRegFaceMeh className={`progress-icon ${progressColorClass}`} />; // Neutro

  if (progress < 84)
    return <FaRegFaceSurprise className={`progress-icon ${progressColorClass}`} />; // Feliz

  if (progress < 99)
    return <FaRegFaceSmileBeam className={`progress-icon ${progressColorClass}`} />; // Feliz

  return <BsEmojiSunglasses className={`progress-icon ${progressColorClass}`} />; // Muy feliz
};



  return (
    <div className="progressbar">
      <div className="progress-bar-container">

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
              {title} <p>/</p><span><TbFileCv /> Tokyo</span>
            </h2>
          )}

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
              <RiFileEditLine />
            </button>
          )}
        </div>

        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${progressBarColorClass}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-bar-text"><div className={`progress-indicator ${progressColorClass}`}>{progress}%</div> {getProgressIcon()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
