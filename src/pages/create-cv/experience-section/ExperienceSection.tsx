// ExperienceSection.tsx
import React, { useState, useMemo, useEffect } from "react";
import {
  FiChevronDown,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import "./experiencesection.scss";

import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  addExperience,
  updateExperience,
  removeExperience,
} from "../../../reducers/experienceSlice";
import { GrGrow } from "react-icons/gr";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen, updateSectionTitle } from "../../../reducers/cvSectionsSlice";

const months = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

const years = Array.from({ length: 50 }, (_, i) => `${2025 - i}`);

const ExperienceSection: React.FC = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: IState) => state.experienceEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "experienceSection")
  );
    
      const isOpen = sectionState?.isOpen ?? false;

  const updateField = (id: string, field: any, value: any) => {
    dispatch(updateExperience({ id, field, value }));
  };

  /** PROGRESS SYSTEM **/
  const progress = useMemo(() => {
    if (!entries.length) return 0;

    let totalFields = 0;
    let completedFields = 0;

    entries.forEach((entry) => {
      const mandatory = [
        entry.position,
        entry.employer,
        entry.startMonth,
        entry.startYear,
      ];

      mandatory.forEach((field) => {
        totalFields++;
        if (field?.toString().trim()) completedFields++;
      });

      const optional = [
        entry.location,
        entry.description,
      ];

      optional.forEach((field) => {
        totalFields++;
        if (field?.toString().trim()) completedFields++;
      });

      // Fecha de fin solo si NO está en presente
      if (!entry.present) {
        totalFields += 2;
        if (entry.endMonth?.trim()) completedFields++;
        if (entry.endYear?.trim()) completedFields++;
      }
    });

    return Math.round((completedFields / totalFields) * 100);
  }, [entries]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "experienceSection", progress }));
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
    const title = sectionState?.title ?? "Experiencia";

  return (
    <div className={`experience-section ${!isOpen ? "closed" : ""}`}>
      <div className="experience-section__header">
        {/* TÍTULO EDITABLE */}
        <div className="editable-title">
          {!editingTitle ? (
            <h2
              className="title-display"
              onClick={() => setEditingTitle(true)}
            >
              <GrGrow /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "experienceSection", title: e.target.value }))
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            />
          )}
        </div>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("experienceSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="experience-section__content">
          {entries.map((entry) => (
            <div className="experience-card" key={entry.id}>
              <div className="card-grid">
                
                <div className="field">
                  <label>Puesto</label>
                  <input
                    type="text"
                    placeholder="Ej: Desarrollador Backend"
                    value={entry.position}
                    onChange={(e) =>
                      updateField(entry.id, "position", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Empleador</label>
                  <input
                    type="text"
                    placeholder="Ej: Google, Freelancer, Mi empresa"
                    value={entry.employer}
                    onChange={(e) =>
                      updateField(entry.id, "employer", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Localidad</label>
                  <input
                    type="text"
                    placeholder="Ej: Bogotá, Colombia"
                    value={entry.location}
                    onChange={(e) =>
                      updateField(entry.id, "location", e.target.value)
                    }
                  />
                </div>

                <div className="experience-section__dates">

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
                      Actualmente trabajando
                    </label>
                  </div>
                </div>

                <div className="field full">
                  <label>Descripción</label>
                  <textarea
                    placeholder="Describe tus responsabilidades, logros, tecnologías utilizadas, etc."
                    value={entry.description}
                    onChange={(e) =>
                      updateField(entry.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeExperience(entry.id))}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={() => dispatch(addExperience())}>
            <FiPlus /> Agregar Experiencia
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
