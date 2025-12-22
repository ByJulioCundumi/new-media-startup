import React, { useEffect, useMemo, useState, useRef } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./hobbiessection.scss";

import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  addHobbyEntry,
  removeHobbyEntry,
  updateHobbyEntry,
} from "../../../reducers/hobbiesSlice";
import { PiMaskHappy } from "react-icons/pi";
import { setSectionProgress, updateSectionTitle } from "../../../reducers/cvSectionsSlice";
import { toggleSectionOpen } from "../../../reducers/editorsSlice";

const HobbiesSection: React.FC = () => {
  const dispatch = useDispatch();
  const hobbies = useSelector((state: IState) => state.hobbiesEntries);
  
  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "hobbieSection")
  );

  const sectionEditorState = useSelector((state: IState) =>
    state.cvSectionsEditors.sections.find((s) => s.name === "hobbieSection")
  );
      
  const isOpen = sectionEditorState?.isOpen ?? false;

  const lastProgressRef = useRef<number>(-1); // para evitar despachos repetidos

  const addHobby = () => {
    dispatch(
      addHobbyEntry({
        id: crypto.randomUUID(),
        name: "",
      })
    );
  };

  const updateHobby = (id: string, value: string) => {
    dispatch(updateHobbyEntry({ id, name: value }));
  };

  const removeHobby = (id: string) => {
    dispatch(removeHobbyEntry(id));
  };

  /** PROGRESS LOGIC **/
  const progress = useMemo(() => {
    const totalFields = hobbies.length;
    if (totalFields === 0) return 0;
    const completed = hobbies.filter((h) => h.name?.trim()).length;
    return Math.round((completed / totalFields) * 100);
  }, [hobbies]);

  // Guardar progreso solo si cambió
  useEffect(() => {
    if (progress !== lastProgressRef.current) {
      lastProgressRef.current = progress;
      dispatch(setSectionProgress({ name: "hobbieSection", progress }));
    }
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
      const title = sectionState?.title ?? "Pasatiempos";

  return (
    <div className={`hobbies-section ${!isOpen ? "closed" : ""}`}>
      <div className="hobbies-section__header">
        {/* TÍTULO EDITABLE */}
        <div className="editable-title">
          {!editingTitle ? (
            <h2
              className="title-display"
              onClick={() => setEditingTitle(true)}
            >
              <PiMaskHappy /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "hobbieSection", title: e.target.value }))
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            />
          )}
        </div>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("hobbieSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="hobbies-section__content">
          {hobbies.map((hobby) => (
            <div className="hobby-card" key={hobby.id}>
              <input
                type="text"
                placeholder="Ej: Ciclismo..."
                value={hobby.name}
                onChange={(e) => updateHobby(hobby.id, e.target.value)}
              />

              <button className="remove-btn" onClick={() => removeHobby(hobby.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addHobby}>
            <FiPlus /> Agregar Pasatiempo
          </button>
        </div>
      )}
    </div>
  );
};

export default HobbiesSection;
