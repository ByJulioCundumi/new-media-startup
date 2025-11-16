import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiX } from "react-icons/fi";
import "./relevantawards.scss";

interface AwardEntry {
  id: string;
  name: string;
  date: string;
  link?: string;
  description?: string;
  showLink?: boolean;
}

interface RelevantAwardsProps {
  initialData?: AwardEntry[];
  onChange?: (data: AwardEntry[]) => void;
}

const RelevantAwards: React.FC<RelevantAwardsProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [awards, setAwards] = useState<AwardEntry[]>(initialData || []);

  const addAward = () => {
    const newAward: AwardEntry = {
      id: crypto.randomUUID(),
      name: "",
      date: "",
      description: "",
      showLink: false,
    };
    const updated = [...awards, newAward];
    setAwards(updated);
    onChange?.(updated);
  };

  const updateAward = (id: string, field: keyof AwardEntry, value: any) => {
    const updated = awards.map((a) => (a.id === id ? { ...a, [field]: value } : a));
    setAwards(updated);
    onChange?.(updated);
  };

  const removeAward = (id: string) => {
    const updated = awards.filter((a) => a.id !== id);
    setAwards(updated);
    onChange?.(updated);
  };

  const toggleLink = (id: string) => {
    const updated = awards.map((a) =>
      a.id === id ? { ...a, showLink: !a.showLink, link: a.showLink ? "" : a.link } : a
    );
    setAwards(updated);
  };

  return (
    <div className={`awards-section ${!isOpen ? "closed" : ""}`}>
      <div className="awards-section__header">
        <h2>Premios y Reconocimientos</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="awards-section__content">
          {awards.map((award) => (
            <div className="award-card" key={award.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Nombre del premio</label>
                  <input
                    type="text"
                    placeholder="Ej: Mejor Proyecto del Año"
                    value={award.name}
                    onChange={(e) => updateAward(award.id, "name", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Fecha</label>
                  <input
                    type="month"
                    value={award.date}
                    onChange={(e) => updateAward(award.id, "date", e.target.value)}
                  />
                </div>

                {/* Input de enlace ocupa toda la fila */}
                <div className="field full">
                  {award.showLink ? (
                    <div className="link-input-row">
                      <label>Enlace del premio</label>
                      <div className="link-input-container">
                        <input
                          type="text"
                          placeholder="Ej: https://premios.com/proyecto"
                          value={award.link || ""}
                          onChange={(e) => updateAward(award.id, "link", e.target.value)}
                        />
                        <button
                          type="button"
                          className="remove-link-btn"
                          onClick={() => toggleLink(award.id)}
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="add-link-btn"
                      onClick={() => toggleLink(award.id)}
                    >
                      <FiPlus /> Agregar enlace
                    </button>
                  )}
                </div>

                <div className="field full">
                  <label>Descripción</label>
                  <textarea
                    placeholder="Breve descripción del premio..."
                    value={award.description || ""}
                    onChange={(e) => updateAward(award.id, "description", e.target.value)}
                  />
                </div>
              </div>

              <button className="remove-btn" onClick={() => removeAward(award.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addAward}>
            <FiPlus /> Agregar Premio
          </button>
        </div>
      )}
    </div>
  );
};

export default RelevantAwards;
