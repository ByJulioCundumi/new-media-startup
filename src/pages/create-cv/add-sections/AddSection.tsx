import React from "react";
import { useSelector, useDispatch } from "react-redux";

import type { IState } from "../../../interfaces/IState";

import {
  enableSection,
  disableSection,
  setSectionProgress,
} from "../../../reducers/cvSectionsSlice";

import {
  PiIdentificationBadgeFill,
  PiMaskHappyFill,
} from "react-icons/pi";
import { FaLink, FaGraduationCap } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import "./addsection.scss";

import { clearAllLinks } from "../../../reducers/linksSlice";
import { clearAllCourses } from "../../../reducers/coursesSlice";
import { clearAllHobbies } from "../../../reducers/hobbiesSlice";
import { clearAllReferences } from "../../../reducers/referencesSlice";
import { clearAllAwards } from "../../../reducers/awardsSlice";
import { clearAllCustom } from "../../../reducers/customSlice";

const AddSections: React.FC = () => {
  const dispatch = useDispatch();
  const cvSections = useSelector((state: IState) => state.cvSections);

  const sections = [
    { name: "personalInfoSection", label: "Información Personal", icon: <PiIdentificationBadgeFill /> },
    { name: "linkSection", label: "Enlaces", icon: <FaLink /> },
    { name: "courseSection", label: "Cursos", icon: <FaGraduationCap /> },
    { name: "hobbieSection", label: "Hobbies", icon: <PiMaskHappyFill /> },
    { name: "referenceSection", label: "Referencias", icon: <MdRateReview /> },
    { name: "awardSection", label: "Premios", icon: <BsAwardFill /> },
    { name: "customSection", label: "Personalizado", icon: <BiEditAlt /> },
  ];

  const toggleSection = (name: string, enabled: boolean) => {
    if (enabled) {
      dispatch(disableSection(name));
      dispatch(setSectionProgress({ name, progress: 0 }));

      switch (name) {
        case "personalInfoSection":
        case "linkSection":
          dispatch(clearAllLinks());
          break;
        case "courseSection":
          dispatch(clearAllCourses());
          break;
        case "hobbieSection":
          dispatch(clearAllHobbies());
          break;
        case "referenceSection":
          dispatch(clearAllReferences());
          break;
        case "awardSection":
          dispatch(clearAllAwards());
          break;
        case "customSection":
          dispatch(clearAllCustom());
          break;
      }
    } else {
      dispatch(enableSection(name));
    }
  };

  return (
    <div className="add-sections">
      <div className="as-list">
        {sections.map((sec) => {
          const data = cvSections.sections.find((s) => s.name === sec.name);
          const enabled = data?.enabled ?? false;
          const finalTitle = data?.title || sec.label;

          return (
            <div
              key={sec.name}
              className={`as-item ${enabled ? "enabled" : "disabled"}`}
              onClick={() => toggleSection(sec.name, enabled)}
            >
              <div className="as-left">
                <div className="as-icon-box">
                  {sec.icon}
                </div>

                <div className="as-texts">
                  <span className="as-title">{finalTitle}</span>
                  <small className="as-state">
                    {enabled ? "Sección activa" : "Inactiva"}
                  </small>
                </div>
              </div>

              <div className="as-toggle-indicator">
                {enabled ? "✓" : "+"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddSections;
