import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./personalinfosection.scss";
import type { IState } from "../../../interfaces/IState";

import {
  addPersonalInfoEntry,
  removePersonalInfoEntry,
  updatePersonalInfoEntry,
  setPersonalInfoEntries,
} from "../../../reducers/personalInfoSlice";

import {
  setSectionProgress,
  updateSectionTitle,
} from "../../../reducers/cvSectionsSlice";

import type { IPersonalInfoEntry } from "../../../interfaces/IPersonalInfo";
import { PiIdentificationBadge } from "react-icons/pi";
import { toggleSectionOpen } from "../../../reducers/editorsSlice";

const SUGGESTIONS = [
  "Ubicación",
  "Dirección",
  "Código postal",
  "Nacionalidad",
  "Fecha de nacimiento",
  "Estado civil",
];

// === NUEVO: placeholders dinámicos según la sugerencia ===
const PLACEHOLDERS: Record<string, string> = {
  "Ubicación": "Ej: Medellín, Colombia",
  "Dirección": "Ej: Calle 123 #45-67",
  "Código postal": "Ej: 050010",
  "Nacionalidad": "Ej: Colombiana",
  "Fecha de nacimiento": "Ej: 12/08/1995",
  "Estado civil": "Ej: Soltero",
};

interface PersonalInfoSectionProps {
  initialData?: IPersonalInfoEntry[];
  onChange?: (data: IPersonalInfoEntry[]) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  initialData,
  onChange,
}) => {
  const dispatch = useDispatch();
  const entries = useSelector((state: IState) => state.personalInfo);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "personalInfoSection")
  );

  const sectionEditorState = useSelector((state: IState) =>
    state.cvSectionsEditors.sections.find((s) => s.name === "personalInfoSection")
  );

  const isOpen = sectionEditorState?.isOpen ?? false;

  // Sincronización inicial
  useEffect(() => {
    if (initialData) dispatch(setPersonalInfoEntries(initialData));
  }, [initialData, dispatch]);

  // Notificar al padre
  useEffect(() => {
    onChange?.(entries);
  }, [entries, onChange]);

  // Crear campo manual
  const addEntry = () => {
    dispatch(
      addPersonalInfoEntry({
        id: crypto.randomUUID(),
        name: "",
        value: "",
      })
    );
  };

  // Crear campo desde sugerencia con placeholder dinámico
  const addSuggestion = (title: string) => {
    const exists = entries.some(
      (e) => e.name.toLowerCase() === title.toLowerCase()
    );
    if (exists) return;

    dispatch(
      addPersonalInfoEntry({
        id: crypto.randomUUID(),
        name: title,
        value: "",
      })
    );
  };

  const updateEntry = (
    id: string,
    field: keyof IPersonalInfoEntry,
    value: string
  ) => {
    dispatch(updatePersonalInfoEntry({ id, field, value }));
  };

  const remove = (id: string) => {
    dispatch(removePersonalInfoEntry(id));
  };

  // ---- PROGRESO ----
  const progress = useMemo(() => {
    if (entries.length === 0) return 0;

    let filled = 0;
    const total = entries.length * 2;

    for (const e of entries) {
      if (e.name.trim()) filled++;
      if (e.value.trim()) filled++;
    }

    return Math.round((filled / total) * 100);
  }, [entries]);

  useEffect(() => {
    dispatch(setSectionProgress({ name: "personalInfoSection", progress }));
  }, [progress, dispatch]);

  const progressColorClass =
    progress < 50 ? "progress-red" : progress < 100 ? "progress-yellow" : "progress-blue";

// -----------------------------
      // 🔵 STATE PARA EDICIÓN DEL TÍTULO
      // -----------------------------
      const [editingTitle, setEditingTitle] = useState(false);
      const title = sectionState?.title ?? "Detalles";

  return (
    <div className={`personal-info-section ${!isOpen ? "closed" : ""}`}>
      <div className="personal-info-section__header">
        {/* TÍTULO EDITABLE */}
      <div className="editable-title">
        {!editingTitle ? (
          <h2
            className="title-display"
            onClick={() => setEditingTitle(true)}
          >
            <PiIdentificationBadge /> {title}
          </h2>
        ) : (
          <input
            className="title-input"
            autoFocus
            value={title}
            onChange={(e) =>
              dispatch(updateSectionTitle({ name: "personalInfoSection", title: e.target.value }))
            }
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
          />
        )}
      </div>

        <div className={`progress-indicator-box ${progressColorClass}`}>
          {progress}%
        </div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("personalInfoSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="personal-info-section__content">
          {/* ------- CAMPOS DINÁMICOS ------- */}
          {entries.map((entry) => (
            <div className="info-card" key={entry.id}>
              <div className="card-grid">
                {/* ---- CAMPO TITULO ---- */}
                <div className="field">
                  <label>Título</label>
                  <input
                    type="text"
                    placeholder="Ej: Dirección"
                    value={entry.name}
                    onChange={(e) =>
                      updateEntry(entry.id, "name", e.target.value)
                    }
                  />
                </div>

                {/* ---- CAMPO VALOR CON PLACEHOLDER AUTOMÁTICO ---- */}
                <div className="field">
                  <label>Valor</label>
                  <input
                    type="text"
                    placeholder={
                      PLACEHOLDERS[entry.name] || "Ingresa un valor..."
                    }
                    value={entry.value}
                    onChange={(e) =>
                      updateEntry(entry.id, "value", e.target.value)
                    }
                  />
                </div>
              </div>

              <button className="remove-btn" onClick={() => remove(entry.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          {/* ------- SUGERENCIAS ------- */}
          <div className="suggestions-box">
            <p className="suggestions-title">Sugerencias</p>

            <div className="suggestions-list">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="suggestion-item"
                  onClick={() => addSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="add-btn" onClick={addEntry}>
            <FiPlus /> Campo Personalizado
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;
