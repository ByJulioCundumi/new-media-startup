import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiX } from "react-icons/fi";
import "./relevantawards.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  addAwardEntry,
  removeAwardEntry,
  toggleAwardLink,
  updateAwardEntry,
} from "../../../reducers/awardsSlice";

import { BsAward } from "react-icons/bs";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen } from "../../../reducers/cvSectionsSlice";

const RelevantAwards: React.FC = () => {
  const dispatch = useDispatch();

  const awards = useSelector((state: IState) => state.awardsEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.find(s => s.name === "awardSection")
  );
            
  const isOpen = sectionState?.isOpen ?? false;

  const addAward = () => {
    dispatch(
      addAwardEntry({
        id: crypto.randomUUID(),
        name: "",
        date: "",
        description: "",
        showLink: false,
      })
    );
  };

  const updateAward = (
    id: string,
    field: "name" | "date" | "link" | "description" | "showLink",
    value: any
  ) => {
    dispatch(updateAwardEntry({ id, field, value }));
  };

  const removeAward = (id: string) => {
    dispatch(removeAwardEntry(id));
  };

  const toggleLink = (id: string) => {
    dispatch(toggleAwardLink(id));
  };

  // ==========================
  // CÁLCULO DE PORCENTAJE
  // ==========================
  const progress = useMemo(() => {
    if (!awards.length) return 0;

    let totalFields = 0;
    let filledFields = 0;

    awards.forEach((award) => {
      // Obligatorios
      totalFields += 2;
      if (award.name?.trim()) filledFields++;
      if (award.date?.trim()) filledFields++;

      // Opcionales
      totalFields += 1;
      if (award.description?.trim()) filledFields++;

      // Link opcional
      if (award.showLink) {
        totalFields += 1;
        if (award.link?.trim()) filledFields++;
      }
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [awards]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "awardSection", progress }));
}, [progress, dispatch]);

  return (
    <div className={`awards-section ${!isOpen ? "closed" : ""}`}>
      <div className="awards-section__header">
        <h2>
          <BsAward /> Premios y Reconocimientos
        </h2>

        {/* BADGE DE PROGRESO */}
        <div className="progress-indicator">
          {progress}%
        </div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("awardSection"))}
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

                {/* Campo de enlace */}
                <div className="field full">
                  {award.showLink ? (
                    <div className="link-input-row">
                      <label>Enlace del premio</label>
                      <div className="link-input-container">
                        <input
                          type="text"
                          placeholder="Ej: https://premios.com/proyecto"
                          value={award.link || ""}
                          onChange={(e) =>
                            updateAward(award.id, "link", e.target.value)
                          }
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
                    onChange={(e) =>
                      updateAward(award.id, "description", e.target.value)
                    }
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
