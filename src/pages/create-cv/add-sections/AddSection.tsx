import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaLink, FaGraduationCap } from "react-icons/fa";
import type { IState } from "../../../interfaces/IState";

import {
  enableSection,
  disableSection,
  setSectionProgress,
} from "../../../reducers/cvSectionsSlice";

import { clearCustomSection } from "../../../reducers/customSlice";
import { clearAllLinks } from "../../../reducers/linksSlice";
import { clearAllAwards } from "../../../reducers/awardsSlice";
import { clearAllReferences } from "../../../reducers/referencesSlice";
import { clearAllHobbies } from "../../../reducers/hobbiesSlice";
import { clearAllCourses } from "../../../reducers/coursesSlice";

import "./addsection.scss";

import { PiMaskHappyFill } from "react-icons/pi";
import { MdRateReview } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";
import { BiSolidLayerPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbNewSection } from "react-icons/tb";

const AddSections: React.FC = () => {
  const dispatch = useDispatch();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const cvSections = useSelector((state: IState) => state.cvSections);

  const sections = [
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
        case "linkSection": dispatch(clearAllLinks()); break;
        case "courseSection": dispatch(clearAllCourses()); break;
        case "hobbieSection": dispatch(clearAllHobbies()); break;
        case "referenceSection": dispatch(clearAllReferences()); break;
        case "awardSection": dispatch(clearAllAwards()); break;
        case "customSection": dispatch(clearCustomSection()); break;
      }
    } else {
      dispatch(enableSection(name));
    }
  };

  const scrollLeft = () =>
    scrollerRef.current?.scrollBy({ left: -180, behavior: "smooth" });

  const scrollRight = () =>
    scrollerRef.current?.scrollBy({ left: 180, behavior: "smooth" });

  // ✅ Calcular cuántas secciones del arreglo están activas
  const activeSections = sections.filter((sec) => {
    const s = cvSections.find((c) => c.name === sec.name);
    return s?.enabled === true;
  }).length;

  return (
    <div className="add-sections">
      <div className="add-sections-inner">

        <h3 className="title">
          Agregar Secciones
          <span className="count">
            <TbNewSection /> {activeSections}/6
          </span>
        </h3>

        <div className="row">
          <button className="scroll-btn" onClick={scrollLeft}>
            <IoIosArrowBack />
          </button>

          <div ref={scrollerRef} className="scroll-area">
            {sections.map((sec) => {
              const section = cvSections.find((s) => s.name === sec.name);
              const enabled = section?.enabled;

              return (
                <button
                  key={sec.name}
                  className={`pill ${enabled ? "active" : ""}`}
                  onClick={() => toggleSection(sec.name, enabled ?? false)}
                >
                  <span className="icon">{sec.icon}</span>
                  {sec.label}
                </button>
              );
            })}
          </div>

          <button className="scroll-btn" onClick={scrollRight}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSections;
