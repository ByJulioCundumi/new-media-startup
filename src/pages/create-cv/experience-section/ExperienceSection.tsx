// ExperienceSection.tsx
import React, { useState } from "react";
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

const months = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

const years = Array.from({ length: 50 }, (_, i) => `${2025 - i}`);

const ExperienceSection: React.FC = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: IState) => state.experienceEntries);
  const [isOpen, setIsOpen] = useState(true);

  const updateField = (id: string, field: any, value: any) => {
    dispatch(updateExperience({ id, field, value }));
  };

  return (
    <div className={`experience-section ${!isOpen ? "closed" : ""}`}>
      <div className="experience-section__header">
        <h2><GrGrow /> Experiencia Profesional</h2>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
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
