import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiEdit3 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./customsection.scss";

import type { ICustomEntry } from "../../../interfaces/ICustom";
import type { IState } from "../../../interfaces/IState";

import {
  addCustomEntry,
  removeCustomEntry,
  updateCustomEntry,
} from "../../../reducers/customSlice";
import {
  setSectionProgress,
  updateSectionTitle,
} from "../../../reducers/cvSectionsSlice";

import RichTextEditor from "../../../components/rich-text-editor/RichTextEditor";
import { toggleSectionOpen } from "../../../reducers/editorsSlice";

const CustomSection: React.FC = () => {
  const dispatch = useDispatch();

  const entries: ICustomEntry[] = useSelector(
    (state: IState) => state.customEntries || []
  );

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "customSection")
  );

  const sectionEditorState = useSelector((state: IState) =>
    state.cvSectionsEditors.sections.find((s) => s.name === "customSection")
  );

  const isOpen = sectionEditorState?.isOpen ?? false;
  const title = sectionState?.title ?? "Campo Personalizado";
  const [editingTitle, setEditingTitle] = useState(false);

  const activateSection = () => {
    dispatch(addCustomEntry({ id: crypto.randomUUID(), value: "" }));
  };

  const addNewEntry = () => {
    dispatch(addCustomEntry({ id: crypto.randomUUID(), value: "" }));
  };

  const updateEntry = (id: string, html: string) => {
    dispatch(updateCustomEntry({ id, value: html }));
  };

  const removeEntry = (id: string) => {
    dispatch(removeCustomEntry(id));
  };

  // PROGRESO CORREGIDO Y PRECISO
  const progress = useMemo(() => {
    if (entries.length === 0) return 0;

    const completedCount = entries.filter((entry) => {
      if (!entry.value || entry.value.trim() === "") return false;

      const textOnly = entry.value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return textOnly.length > 0;
    }).length;

    return Math.round((completedCount / entries.length) * 100);
  }, [entries]);

  useEffect(() => {
    dispatch(setSectionProgress({ name: "customSection", progress }));
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress === 0) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  return (
    <div className={`custom-section ${!isOpen ? "closed" : ""}`}>
      <div className="custom-section__header">
        <div className="editable-title">
          {!editingTitle ? (
            <h2 className="title-display" onClick={() => setEditingTitle(true)}>
              <FiEdit3 /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "customSection", title: e.target.value }))
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
          onClick={() => dispatch(toggleSectionOpen("customSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="custom-section__content">
          {entries.length === 0 ? (
            <button className="add-btn" onClick={activateSection}>
              <FiPlus /> Agregar Item
            </button>
          ) : (
            <>
              {entries.map((entry) => (
                <div className="contact-card" key={entry.id}>
                  <div className="card-grid">
                    <div className="field">
                      <label>Contenido</label>
                      <RichTextEditor
                        value={entry.value}
                        onChange={(html) => updateEntry(entry.id, html)}
                        placeholder="Escribe aquí tu texto personalizado con formato: negritas, listas, enlaces..."
                      />
                    </div>
                  </div>

                  <button className="remove-btn" onClick={() => removeEntry(entry.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}

              <button className="add-btn" onClick={addNewEntry}>
                <FiPlus /> Agregar otra entrada
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSection;