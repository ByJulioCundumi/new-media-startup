import React, { useState } from "react";
import {
  FiChevronUp,
  FiTrash2,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";
import "./experiencesection.scss";

interface ExperienceEntry {
  id: string;
  position: string;
  employer: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  present: boolean;
  description: string;
}

interface ExperienceSectionProps {
  initialData?: ExperienceEntry[];
  onChange?: (data: ExperienceEntry[]) => void;
}

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const years = Array.from({ length: 50 }, (_, i) => `${2025 - i}`);

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  initialData,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [entries, setEntries] = useState<ExperienceEntry[]>(
    initialData || []
  );

  const addEntry = () => {
    const newEntry: ExperienceEntry = {
      id: crypto.randomUUID(),
      position: "",
      employer: "",
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

  const updateEntry = (id: string, field: keyof ExperienceEntry, value: any) => {
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
    <div className={`experience-section ${!isOpen ? "closed" : ""}`}>
      <div className="experience-section__header">
        <h2>Experiencia Profesional</h2>

        <button className={`toggle-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="experience-section__content">
            {entries.map((entry) => (
              <div className="experience-card" key={entry.id}>
                <div className="card-grid">
                  
                  <div className="field">
                    <label>Puesto</label>
                    <input
                      type="text"
                      placeholder="Ej: Desarrollador Frontend"
                      value={entry.position}
                      onChange={(e) =>
                        updateEntry(entry.id, "position", e.target.value)
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Empleador</label>
                    <input
                      type="text"
                      placeholder="Ej: Google"
                      value={entry.employer}
                      onChange={(e) =>
                        updateEntry(entry.id, "employer", e.target.value)
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Localidad</label>
                    <input
                      type="text"
                      placeholder="Ej: Madrid, España"
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
                      Actualmente trabajando
                    </label>
                  </div>

                  <div className="field full">
                    <label>Descripción</label>
                    <textarea
                      placeholder="Ej: Responsable de desarrollo frontend en proyectos web…"
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
              <FiPlus /> Agregar Experiencia
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceSection;
