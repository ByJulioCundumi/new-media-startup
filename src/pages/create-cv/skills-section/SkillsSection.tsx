import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./skillssection.scss";
import type { IState } from "../../../interfaces/IState";
import { addSkillEntry, removeSkillEntry, updateSkillEntry } from "../../../reducers/skillsSlice";
import { FaRegHandBackFist } from "react-icons/fa6";

const levels = ["Principiante", "Intermedio", "Bueno", "Alto", "Experto"] as const;

const SkillsSection: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: IState) => state.skillsEntries); // 👈 SIEMPRE array

  const [isOpen, setIsOpen] = useState(true);

  const add = () => {
    dispatch(
      addSkillEntry({
        id: crypto.randomUUID(),
        name: "",
        level: "Principiante",
      })
    );
  };

  return (
    <div className={`skills-section ${!isOpen ? "closed" : ""}`}>
      <div className="skills-section__header">
        <h2><FaRegHandBackFist /> Habilidades</h2>
        <button className={`toggle-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
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
