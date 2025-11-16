import React, { useState } from "react";
import {
  FiChevronUp,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";
import "./educationsection.scss";

interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  present: boolean;
  description: string;
}

interface EducationSectionProps {
  initialData?: EducationEntry[];
  onChange?: (data: EducationEntry[]) => void;
}

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const years = Array.from({ length: 50 }, (_, i) => `${2025 - i}`);

const EducationSection: React.FC<EducationSectionProps> = ({
  initialData,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [entries, setEntries] = useState<EducationEntry[]>(
    initialData || []
  );

  const addEntry = () => {
    const newEntry: EducationEntry = {
      id: crypto.randomUUID(),
      institution: "",
      location: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      present: false,
      description: "",
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange?.(updated);
  };

  const updateEntry = (id: string, field: keyof EducationEntry, value: any) => {
    const updated = entries.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    setEntries(updated);
    onChange?.(updated);
  };

  const removeEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    onChange?.(updated);
  };

  return (
    <div className={`education-section ${!isOpen ? "closed" : ""}`}>
      <div className="education-section__header">
        <h2>Formación Académica</h2>

        <button className={`toggle-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="education-section__content">
            {entries.map((entry) => (
              <div className="education-card" key={entry.id}>
                <div className="card-grid">
                  <div className="field">
                    <label>Institución</label>
                    <input
                      type="text"
                      placeholder="Ej: Universidad Nacional"
                      value={entry.institution}
                      onChange={(e) =>
                        updateEntry(entry.id, "institution", e.target.value)
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
                        updateEntry(entry.id, "location", e.target.value)
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Fecha de Inicio</label>
                    <div className="double">
                      <select
                        value={entry.startMonth}
                        onChange={(e) =>
                          updateEntry(entry.id, "startMonth", e.target.value)
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
                          updateEntry(entry.id, "startYear", e.target.value)
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
                          updateEntry(entry.id, "endMonth", e.target.value)
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
                          updateEntry(entry.id, "endYear", e.target.value)
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
                          updateEntry(entry.id, "present", e.target.checked)
                        }
                      />
                      Actualmente cursando
                    </label>
                  </div>

                  <div className="field full">
                    <label>Descripción</label>
                    <textarea
                      placeholder="Ej: Licenciatura en Ingeniería de Sistemas..."
                      value={entry.description}
                      onChange={(e) =>
                        updateEntry(entry.id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <button className="remove-btn" onClick={() => removeEntry(entry.id)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}

            <button className="add-btn" onClick={addEntry}>
              <FiPlus /> Agregar Formación
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EducationSection;
