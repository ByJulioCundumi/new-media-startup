import React, { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiTrash2, FiPlus } from "react-icons/fi";
import "./educationsection.scss";

import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import type { IEducationEntry } from "../../../interfaces/IEducation";
import {
  addEducation,
  removeEducation,
  updateEducation,
} from "../../../reducers/educationSlice";
import { PiStudentLight } from "react-icons/pi";
import { setSectionProgress, toggleSectionOpen, updateSectionTitle } from "../../../reducers/cvSectionsSlice";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const years = Array.from({ length: 50 }, (_, i) => `${2025 - i}`);

const EducationSection: React.FC = () => {
  const dispatch = useDispatch();

  const entries = useSelector((state: IState) => state.educationEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "educationSection")
  );

  const isOpen = sectionState?.isOpen ?? false;

  const updateField = (
    id: string,
    field: keyof IEducationEntry,
    value: any
  ) => {
    dispatch(updateEducation({ id, field, value }));
  };

  /** PROGRESO DINÁMICO SOLO SI LOS CAMPOS EXISTEN Y ESTÁN LLENOS */
  const getProgress = () => {
    if (!entries.length) return 0;

    const baseFields = ["title", "institution", "location", "startMonth", "startYear"];

    let filled = 0;
    let total = 0;

    entries.forEach(entry => {
      // Campos obligatorios siempre presentes
      baseFields.forEach(field => {
        total++;
        if (entry[field as keyof IEducationEntry]) filled++;
      });

      // Fecha de finalización solo si NO está en curso
      if (!entry.present) {
        total++;
        if (entry.endMonth) filled++;

        total++;
        if (entry.endYear) filled++;
      }

      // Información extra solo si está habilitada
      if (entry.showExtraInfo) {
        total++;
        if (entry.description?.trim()) filled++;
      }
    });

    return Math.round((filled / total) * 100);
  };

  const progress = getProgress();

  // Guardar progreso en tiempo real
  useEffect(() => {
    dispatch(setSectionProgress({ name: "educationSection", progress }));
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
    const title = sectionState?.title ?? "Educación";

  return (
    <div className={`education-section ${!isOpen ? "closed" : ""}`}>
      <div className="education-section__header">
        {/* TÍTULO EDITABLE */}
        <div className="editable-title">
          {!editingTitle ? (
            <h2
              className="title-display"
              onClick={() => setEditingTitle(true)}
            >
              <PiStudentLight /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "educationSection", title: e.target.value }))
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            />
          )}
        </div>
        
        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("educationSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="education-section__content">
          {entries.map((entry) => (
            <div className="education-card" key={entry.id}>
              <div className="card-grid">

                <div className="field">
                  <label>Título / Programa</label>
                  <input
                    type="text"
                    value={entry.title}
                    placeholder="Ej: Ingeniería de Sistemas"
                    onChange={(e) =>
                      updateField(entry.id, "title", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Institución</label>
                  <input
                    type="text"
                    value={entry.institution}
                    placeholder="Ej: Universidad Nacional"
                    onChange={(e) =>
                      updateField(entry.id, "institution", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Localidad</label>
                  <input
                    type="text"
                    value={entry.location}
                    placeholder="Ej: Bogotá, Colombia"
                    onChange={(e) =>
                      updateField(entry.id, "location", e.target.value)
                    }
                  />
                </div>

                <div className="education-section__dates">
                  <div className="field">
                    <label>Fecha de Inicio</label>
                    <div className="double">
                      <select
                        value={entry.startMonth}
                        onChange={(e) =>
                          updateField(entry.id, "startMonth", e.target.value)
                        }
                      >
                        <option value="">Mes</option>
                        {months.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>

                      <select
                        value={entry.startYear}
                        onChange={(e) =>
                          updateField(entry.id, "startYear", e.target.value)
                        }
                      >
                        <option value="">Año</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Fecha de Finalización</label>
                    <div className="double">
                      <select
                        disabled={entry.present}
                        value={entry.endMonth}
                        onChange={(e) =>
                          updateField(entry.id, "endMonth", e.target.value)
                        }
                      >
                        <option value="">Mes</option>
                        {months.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>

                      <select
                        disabled={entry.present}
                        value={entry.endYear}
                        onChange={(e) =>
                          updateField(entry.id, "endYear", e.target.value)
                        }
                      >
                        <option value="">Año</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <label className="present-toggle">
                      <input
                        type="checkbox"
                        checked={entry.present}
                        onChange={(e) =>
                          updateField(entry.id, "present", e.target.checked)
                        }
                      />
                      Actualmente cursando
                    </label>
                  </div>
                </div>

                {/* BOTÓN PARA MOSTRAR / OCULTAR INFO EXTRA */}
                {!entry.showExtraInfo ? (
                  <button
                    className="add-extra-btn"
                    onClick={() => updateField(entry.id, "showExtraInfo", true)}
                  >
                    <FiPlus /> Nota
                  </button>
                ) : (
                  <div className="field full">
                    <label>Información Extra</label>

                    <textarea
                      value={entry.description}
                      placeholder="Ej: Modalidad presencial / virtual, etc..."
                      onChange={(e) =>
                        updateField(entry.id, "description", e.target.value)
                      }
                    />

                    <button
                      className="add-extra-btn"
                      onClick={() => updateField(entry.id, "showExtraInfo", false)}
                    >
                      Ocultar información extra
                    </button>
                  </div>
                )}

              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeEducation(entry.id))}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={() => dispatch(addEducation())}>
            <FiPlus /> Agregar Formación
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
