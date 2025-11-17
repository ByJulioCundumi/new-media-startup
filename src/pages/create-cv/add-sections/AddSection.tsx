import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaLink,
  FaGraduationCap,
  FaHeart,
  FaUserFriends,
  FaAward,
  FaRegStar,
} from "react-icons/fa";
import type { IState } from "../../../interfaces/IState";
import {
  setShowLinks,
  setShowCourses,
  setShowHobbies,
  setShowReferences,
  setShowAwards,
  setShowCustom,
} from "../../../reducers/addSectionsSlice";
import "./addsection.scss";
import { PiMaskHappyFill } from "react-icons/pi";
import { MdRateReview } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";
import { BiSolidLayerPlus } from "react-icons/bi";

const AddSections: React.FC = () => {
  const dispatch = useDispatch();

  const {
    showLinks,
    showCourses,
    showHobbies,
    showReferences,
    showAwards,
    showCustom,
  } = useSelector((state: IState) => state.addSections);

  const sections = [
    { label: "Enlaces", value: showLinks, action: setShowLinks, icon: <FaLink /> },
    { label: "Cursos", value: showCourses, action: setShowCourses, icon: <FaGraduationCap /> },
    { label: "Pasatiempos", value: showHobbies, action: setShowHobbies, icon: <PiMaskHappyFill /> },
    { label: "Referencias", value: showReferences, action: setShowReferences, icon: <MdRateReview /> },
    { label: "Premios Relevantes", value: showAwards, action: setShowAwards, icon: <BsAwardFill /> },
    { label: "Sección Personalizada", value: showCustom, action: setShowCustom, icon: <BiSolidLayerPlus /> },
  ];

  const toggleSection = (action: (value: boolean) => any, current: boolean) => {
    dispatch(action(!current));
  };

  return (
    <div className="add-sections improved">
      <div className="add-sections__header">
        <h2 className="add-sections__title">Agregar Secciones</h2>
      </div>

      <div className="add-sections__content">
        <div className="selector-grid">
          {sections.map((sec) => (
            <button
              key={sec.label}
              className={`selector-card ${sec.value ? "active" : ""}`}
              onClick={() => toggleSection(sec.action, sec.value)}
            >
              <div className="card-icon-wrapper">
                <div className="icon">{sec.icon}</div>
              </div>

              <div className="info">
                <span className="label">{sec.label}</span>
                <span className="status">{sec.value ? "Activo" : "Inactivo"}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddSections;
