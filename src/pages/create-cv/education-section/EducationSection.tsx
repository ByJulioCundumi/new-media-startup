import React, { useState } from "react";
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

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const years = Array.from({ length: 50 }, (_, i) => `${2025 - i}`);

const EducationSection: React.FC = () => {
  const dispatch = useDispatch();

  const entries = useSelector(
    (state: IState) => state.educationEntries
  );

  const [isOpen, setIsOpen] = useState(true);

  const updateField = (
    id: string,
    field: keyof IEducationEntry,
    value: any
  ) => {
    dispatch(updateEducation({ id, field, value }));
  };

  return (
    <div className={`education-section ${!isOpen ? "closed" : ""}`}>
      <div className="education-section__header">
        <h2><PiStudentLight /> Formación Académica</h2>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="education-section__content">
          {entries.map((entry) => (
            <div className="education-card" key={entry.id}>
              <div className="card-grid">
                {/* TÍTULO */}
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

                {/* INSTITUCIÓN */}
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

                {/* LOCALIDAD */}
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
                  {/* FECHAS */}
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
                        <option key={m} value={m}>
                          {m}
                        </option>
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
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* FECHA FINAL */}
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
                        <option key={m} value={m}>
                          {m}
                        </option>
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
                        <option key={y} value={y}>
                          {y}
                        </option>
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

                {/* DESCRIPCIÓN */}
                <div className="field full">
                  <label>Informacion Extra</label>
                  <textarea
                    value={entry.description}
                    placeholder="Ej: Modalidad presencial / virtual, etc..."
                    onChange={(e) =>
                      updateField(entry.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* ELIMINAR */}
              <button
                className="remove-btn"
                onClick={() => dispatch(removeEducation(entry.id))}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          {/* AGREGAR */}
          <button className="add-btn" onClick={() => dispatch(addEducation())}>
            <FiPlus /> Agregar Formación
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
