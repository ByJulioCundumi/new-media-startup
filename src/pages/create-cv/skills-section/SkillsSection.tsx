import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./skillssection.scss";
import type { IState } from "../../../interfaces/IState";
import { addSkillEntry, removeSkillEntry, updateSkillEntry } from "../../../reducers/skillsSlice";
import { FaRegHandBackFist } from "react-icons/fa6";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen } from "../../../reducers/cvSectionsSlice";

const levels = ["Principiante", "Intermedio", "Bueno", "Alto", "Experto"] as const;

const SkillsSection: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: IState) => state.skillsEntries);

  const sectionState = useSelector((state: IState) =>
        state.cvSections.find(s => s.name === "skillSection")
      );
              
      const isOpen = sectionState?.isOpen ?? false;

  const add = () => {
    dispatch(
      addSkillEntry({
        id: crypto.randomUUID(),
        name: "",
        level: "Principiante",
      })
    );
  };

  // ==========================
  // CÁLCULO DE PORCENTAJE
  // ==========================
  const progress = useMemo(() => {
    if (!skills.length) return 0;

    const totalFields = skills.length * 2;
    let filledFields = 0;

    skills.forEach((skill) => {
      if (skill.name?.trim()) filledFields++;
      if (skill.level?.trim()) filledFields++; // siempre lleno
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [skills]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "skillSection", progress }));
}, [progress, dispatch]);

const progressColorClass = useMemo(() => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue"; // 100%
}, [progress]);

  return (
    <div className={`skills-section ${!isOpen ? "closed" : ""}`}>
      <div className="skills-section__header">
        <h2>
          <FaRegHandBackFist /> Habilidades
        </h2>

        {/* BADGE DE PROGRESO */}
        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button className={`toggle-btn ${isOpen ? "open" : ""}`} 
          onClick={() => dispatch(toggleSectionOpen("skillSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="skills-section__content">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Habilidad</label>
                  <input
                    type="text"
                    value={skill.name}
                    placeholder="Ej: React"
                    onChange={(e) =>
                      dispatch(updateSkillEntry({ id: skill.id, field: "name", value: e.target.value }))
                    }
                  />
                </div>

                <div className="field">
                  <label>Nivel</label>
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      dispatch(updateSkillEntry({ id: skill.id, field: "level", value: e.target.value }))
                    }
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="remove-btn" onClick={() => dispatch(removeSkillEntry(skill.id))}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={add}>
            <FiPlus /> Agregar Habilidad
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
