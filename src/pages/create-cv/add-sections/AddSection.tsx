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
  enableSection,
  disableSection,
} from "../../../reducers/cvSectionsSlice";
import "./addsection.scss";
import { PiMaskHappyFill } from "react-icons/pi";
import { MdRateReview } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";
import { BiSolidLayerPlus } from "react-icons/bi";

const AddSections: React.FC = () => {
  const dispatch = useDispatch();

  const cvSections = useSelector((state: IState) => state.cvSections);

  const sections = [
    { name: "linkSection", label: "Enlaces", icon: <FaLink /> },
    { name: "courseSection", label: "Cursos", icon: <FaGraduationCap /> },
    { name: "hobbieSection", label: "Pasatiempos", icon: <PiMaskHappyFill /> },
    { name: "referenceSection", label: "Referencias", icon: <MdRateReview /> },
    { name: "awardSection", label: "Premios Relevantes", icon: <BsAwardFill /> },
    { name: "customSection", label: "Sección Personalizada", icon: <BiSolidLayerPlus /> },
  ];

  const toggleSection = (name: string, enabled: boolean) => {
    if (enabled) {
      dispatch(disableSection(name));
    } else {
      dispatch(enableSection(name));
    }
  };

  return (
    <div className="add-sections improved">
      <div className="add-sections__header">
        <h2 className="add-sections__title">Agregar Secciones</h2>
      </div>

      <div className="add-sections__content">
        <div className="selector-grid">
          {sections.map((sec) => {
            const sectionState = cvSections.find((s) => s.name === sec.name);
            const isEnabled = sectionState?.enabled || false;

            return (
              <button
                key={sec.name}
                className={`selector-card ${isEnabled ? "active" : ""}`}
                onClick={() => toggleSection(sec.name, isEnabled)}
              >
                <div className="card-icon-wrapper">
                  <div className="icon">{sec.icon}</div>
                </div>

                <div className="info">
                  <span className="label">{sec.label}</span>
                  <span className="status">{isEnabled ? "Activo" : "Inactivo"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddSections;
