import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./skillssection.scss";

interface Skill {
  id: string;
  name: string;
  level: "Principiante" | "Intermedio" | "Bueno" | "Alto" | "Experto";
}

interface SkillsSectionProps {
  initialData?: Skill[];
  onChange?: (data: Skill[]) => void;
}

const levels: Skill["level"][] = [
  "Principiante",
  "Intermedio",
  "Bueno",
  "Alto",
  "Experto",
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [skills, setSkills] = useState<Skill[]>(initialData || []);

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: "Principiante",
    };
    const updated = [...skills, newSkill];
    setSkills(updated);
    onChange?.(updated);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    const updated = skills.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    setSkills(updated);
    onChange?.(updated);
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    onChange?.(updated);
  };

  return (
    <div className={`skills-section ${!isOpen ? "closed" : ""}`}>
      <div className="skills-section__header">
        <h2>Habilidades</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="skills-section__content">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.id}>
                <div className="card-grid">
                  <div className="field">
                    <label>Habilidad</label>
                    <input
                      type="text"
                      placeholder="Ej: React"
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Nivel</label>
                    <select
                      value={skill.level}
                      onChange={(e) =>
                        updateSkill(skill.id, "level", e.target.value)
                      }
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="remove-btn" onClick={() => removeSkill(skill.id)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}

            <button className="add-btn" onClick={addSkill}>
              <FiPlus /> Agregar Habilidad
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsSection;
