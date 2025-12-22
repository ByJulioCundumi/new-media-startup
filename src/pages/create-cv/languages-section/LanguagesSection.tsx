import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./languagessection.scss";
import type { IState } from "../../../interfaces/IState";
import { addLanguageEntry, removeLanguageEntry, updateLanguageEntry } from "../../../reducers/languagesSlice";
import { HiOutlineLanguage } from "react-icons/hi2";
import { setSectionProgress, updateSectionTitle } from "../../../reducers/cvSectionsSlice";
import { toggleSectionOpen } from "../../../reducers/editorsSlice";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2", "Nativo"] as const;

const LanguagesSection: React.FC = () => {
  const dispatch = useDispatch();
  const languages = useSelector((state: IState) => state.languagesEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "languageSection")
  );

  const sectionEditorState = useSelector((state: IState) =>
    state.cvSectionsEditors.sections.find((s) => s.name === "languageSection")
  );
        
    const isOpen = sectionEditorState?.isOpen ?? false;

  const addLanguage = () => {
    dispatch(
      addLanguageEntry({
        id: crypto.randomUUID(),
        name: "",
        level: "A1",
      })
    );
  };

  // ==========================
  // CÁLCULO DE PORCENTAJE
  // ==========================
  const progress = useMemo(() => {
    if (!languages.length) return 0;

    const totalFields = languages.length * 2;
    let filledFields = 0;

    languages.forEach((lang) => {
      if (lang.name?.trim()) filledFields++;
      if (lang.level?.trim()) filledFields++; // siempre lleno
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [languages]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "languageSection", progress }));
}, [progress, dispatch]);

const progressColorClass = useMemo(() => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue"; // 100%
}, [progress]);

// -----------------------------
      // 🔵 STATE PARA EDICIÓN DEL TÍTULO
      // -----------------------------
      const [editingTitle, setEditingTitle] = useState(false);
      const title = sectionState?.title ?? "Idiomas";

  return (
    <div className={`languages-section ${!isOpen ? "closed" : ""}`}>
      <div className="languages-section__header">
        {/* TÍTULO EDITABLE */}
      <div className="editable-title">
        {!editingTitle ? (
          <h2
            className="title-display"
            onClick={() => setEditingTitle(true)}
          >
            <HiOutlineLanguage /> {title}
          </h2>
        ) : (
          <input
            className="title-input"
            autoFocus
            value={title}
            onChange={(e) =>
              dispatch(updateSectionTitle({ name: "languageSection", title: e.target.value }))
            }
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
          />
        )}
      </div>

        {/* BADGE DE PROGRESO */}
        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("languageSection"))}
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
                    onChange={(e) =>
                      dispatch(
                        updateLanguageEntry({
                          id: lang.id,
                          field: "name",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label>Nivel</label>
                  <select
                    value={lang.level}
                    onChange={(e) =>
                      dispatch(
                        updateLanguageEntry({
                          id: lang.id,
                          field: "level",
                          value: e.target.value,
                        })
                      )
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

              <button
                className="remove-btn"
                onClick={() => dispatch(removeLanguageEntry(lang.id))}
              >
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
