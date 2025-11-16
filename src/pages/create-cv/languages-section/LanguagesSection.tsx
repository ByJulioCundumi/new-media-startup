import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./languagessection.scss";

interface Language {
  id: string;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo";
}

interface LanguagesSectionProps {
  initialData?: Language[];
  onChange?: (data: Language[]) => void;
}

const levels: Language["level"][] = ["A1", "A2", "B1", "B2", "C1", "C2", "Nativo"];

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [languages, setLanguages] = useState<Language[]>(initialData || []);

  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "",
      level: "A1",
    };
    const updated = [...languages, newLang];
    setLanguages(updated);
    onChange?.(updated);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    const updated = languages.map((l) =>
      l.id === id ? { ...l, [field]: value } : l
    );
    setLanguages(updated);
    onChange?.(updated);
  };

  const removeLanguage = (id: string) => {
    const updated = languages.filter((l) => l.id !== id);
    setLanguages(updated);
    onChange?.(updated);
  };

  return (
    <div className={`languages-section ${!isOpen ? "closed" : ""}`}>
      <div className="languages-section__header">
        <h2>Idiomas</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="languages-section__content">
          {languages.map((lang) => (
            <div className="language-card" key={lang.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Idioma</label>
                  <input
                    type="text"
                    placeholder="Ej: Español"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Nivel</label>
                  <select
                    value={lang.level}
                    onChange={(e) => updateLanguage(lang.id, "level", e.target.value)}
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="remove-btn" onClick={() => removeLanguage(lang.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addLanguage}>
            <FiPlus /> Agregar Idioma
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguagesSection;
