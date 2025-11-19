import React, { useRef } from "react";
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
import { MdFormatListBulletedAdd, MdRateReview } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";
import { BiSolidLayerPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbNewSection } from "react-icons/tb";

import "./addsection.scss";
import { clearAllLinks } from "../../../reducers/linksSlice";
import { clearAllCourses } from "../../../reducers/coursesSlice";
import { clearAllHobbies } from "../../../reducers/hobbiesSlice";
import { clearAllReferences } from "../../../reducers/referencesSlice";
import { clearAllAwards } from "../../../reducers/awardsSlice";
import { clearCustomSection } from "../../../reducers/customSlice";

const AddSections: React.FC = () => {
  const dispatch = useDispatch();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cvSections = useSelector((state: IState) => state.cvSections);

  const sections = [
    { name: "personalInfoSection", label: "Información Personal", icon: <PiIdentificationBadgeFill /> },
    { name: "linkSection", label: "Enlaces", icon: <FaLink /> },
    { name: "courseSection", label: "Cursos", icon: <FaGraduationCap /> },
    { name: "hobbieSection", label: "Pasatiempos", icon: <PiMaskHappyFill /> },
    { name: "referenceSection", label: "Referencias", icon: <MdRateReview /> },
    { name: "awardSection", label: "Premios", icon: <BsAwardFill /> },
    { name: "customSection", label: "Personalizado", icon: <BiSolidLayerPlus /> },
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
          dispatch(clearCustomSection());
          break;
      }
    } else {
      dispatch(enableSection(name));
    }
  };

  const scrollLeft = () =>
    scrollerRef.current?.scrollBy({ left: -180, behavior: "smooth" });
  const scrollRight = () =>
    scrollerRef.current?.scrollBy({ left: 180, behavior: "smooth" });

  const activeSections = sections.filter((sec) => {
    const match = cvSections.sections.find((c) => c.name === sec.name);
    return match?.enabled;
  }).length;

  return (
    <div className="add-sections">
      <div className="add-sections-inner">

        <div className="as-header">
          <h3><MdFormatListBulletedAdd /> Agregar Secciones</h3>

          <span className="counter">
            <TbNewSection /> {activeSections}/7
          </span>
        </div>

        <div className="as-row">
          <button className="scroll-btn shadow-left" onClick={scrollLeft}>
            <IoIosArrowBack />
          </button>

          <div ref={scrollerRef} className="scroll-area">
            {sections.map((sec) => {
              const data = cvSections.sections.find((s) => s.name === sec.name);
              const enabled = data?.enabled ?? false;

              return (
                <button
                  key={sec.name}
                  className={`pill ${enabled ? "active" : ""}`}
                  onClick={() => toggleSection(sec.name, enabled)}
                >
                  <span className="icon">{sec.icon}</span>
                  {sec.label}
                </button>
              );
            })}
          </div>

          <button className="scroll-btn shadow-right" onClick={scrollRight}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSections;
