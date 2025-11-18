import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaLink,
  FaGraduationCap,
} from "react-icons/fa";
import type { IState } from "../../../interfaces/IState";
import {
  enableSection,
  disableSection,
  setSectionProgress,
} from "../../../reducers/cvSectionsSlice";
import {
  clearCustomSection,
} from "../../../reducers/customSlice";
import {
  clearAllLinks
} from "../../../reducers/linksSlice";
import {
  clearAllAwards
} from "../../../reducers/awardsSlice";
import {
  clearAllReferences
} from "../../../reducers/referencesSlice";
import {
  clearAllHobbies
} from "../../../reducers/hobbiesSlice";
import {
  clearAllCourses
} from "../../../reducers/coursesSlice";
import "./addsection.scss";

import { PiMaskHappyFill } from "react-icons/pi";
import { MdRateReview } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";
import { BiSolidLayerPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

  const scrollLeft = () => {
    scrollerRef.current?.scrollBy({ left: -160, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({ left: 160, behavior: "smooth" });
  };

  return (
    <div className="add-sections-box">
      <div className="add-sections-bar">
      <h3 className="add-sections-title">Agregar Secciones</h3>

      <div className="sections-row">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <IoIosArrowBack />
        </button>

        <div ref={scrollerRef} className="sections-scroll">
          {sections.map((sec) => {
            const sectionState = cvSections.find((s) => s.name === sec.name);
            const isEnabled = sectionState?.enabled || false;

            return (
              <button
                key={sec.name}
                className={`pill ${isEnabled ? "active" : ""}`}
                onClick={() => toggleSection(sec.name, isEnabled)}
              >
                <span className="icon">{sec.icon}</span>
                {sec.label}
              </button>
            );
          })}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
    </div>
  );
};

export default AddSections;
