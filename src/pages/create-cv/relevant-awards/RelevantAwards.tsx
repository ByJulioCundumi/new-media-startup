import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import { BsAward } from "react-icons/bs";
import "./relevantawards.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  addAwardEntry,
  removeAwardEntry,
  updateAwardEntry,
} from "../../../reducers/awardsSlice";
import {
  setSectionProgress,
  toggleSectionOpen,
  updateSectionTitle,
} from "../../../reducers/cvSectionsSlice";

// RichTextEditor
import RichTextEditor from "../../../components/rich-text-editor/RichTextEditor";
import type { IAwardEntry } from "../../../interfaces/IAward";

const RelevantAwards: React.FC = () => {
  const dispatch = useDispatch();
  const awards = useSelector((state: IState) => state.awardsEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "awardSection")
  );

  const isOpen = sectionState?.isOpen ?? false;
  const title = sectionState?.title ?? "Premios";

  const [editingTitle, setEditingTitle] = useState(false);

  const addAward = () => {
    dispatch(
      addAwardEntry({
        id: crypto.randomUUID(),
        name: "",
        date: "",
        description: "",
      })
    );
  };

  // FUNCIÓN TIPO-SEGURA: evita errores de keyof
  const updateAward = <K extends keyof IAwardEntry>(
    id: string,
    field: K,
    value: IAwardEntry[K]
  ) => {
    dispatch(updateAwardEntry({ id, field, value }));
  };

  const removeAward = (id: string) => {
    dispatch(removeAwardEntry(id));
  };

  // === CÁLCULO DE PROGRESO (compatible con HTML) ===
  const progress = useMemo(() => {
    if (!awards.length) return 0;

    let totalFields = 0;
    let filledFields = 0;

   14

    awards.forEach((award) => {
      // Obligatorios
      totalFields += 2;
      if (award.name?.trim()) filledFields++;
      if (award.date?.trim()) filledFields++;

      // Opcional: descripción
      totalFields += 1;

      const cleanDesc = award.description
        ?.replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
      if (cleanDesc) filledFields++;
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [awards]);

  useEffect(() => {
    dispatch(setSectionProgress({ name: "awardSection", progress }));
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  return (
    <div className={`awards-section ${!isOpen ? "closed" : ""}`}>
      <div className="awards-section__header">
        <div className="editable-title">
          {!editingTitle ? (
            <h2 className="title-display" onClick={() => setEditingTitle(true)}>
              <BsAward /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "awardSection", title: e.target.value }))
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            />
          )}
        </div>

        <div className={`progress-indicator ${progressColorClass}`}>
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
                {/* Nombre del premio */}
                <div className="field">
                  <label>Nombre del premio</label>
                  <input
                    type="text"
                    placeholder="Ej: Mejor Proyecto del Año"
                    value={award.name}
                    onChange={(e) => updateAward(award.id, "name", e.target.value)}
                  />
                </div>

                {/* Fecha */}
                <div className="field">
                  <label>Fecha</label>
                  <input
                    type="month"
                    value={award.date}
                    onChange={(e) => updateAward(award.id, "date", e.target.value)}
                  />
                </div>

                {/* DESCRIPCIÓN CON RICHTEXTEDITOR */}
                <div className="field full description-field">
                  <label>Descripción (opcional)</label>
                  <RichTextEditor
                    value={award.description || ""}
                    onChange={(html) => updateAward(award.id, "description", html)}
                    placeholder="Ej: Otorgado por la Universidad Nacional por excelencia académica..."
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