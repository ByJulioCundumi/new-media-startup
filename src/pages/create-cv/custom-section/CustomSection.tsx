import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./customsection.scss";
import type { IState } from "../../../interfaces/IState";
import type { ICustomItem } from "../../../interfaces/ICustom";
import { setCustomSection } from "../../../reducers/customSlice";
import { BiLayerPlus } from "react-icons/bi";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen, updateSectionTitle } from "../../../reducers/cvSectionsSlice";

const CustomSection: React.FC = () => {
  const dispatch = useDispatch();

  const { title: savedTitle, items: savedItems } = useSelector(
    (state: IState) => state.customEntry
  );
  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "customSection")
  );

  const [items, setItems] = useState<ICustomItem[]>(savedItems);
  const [editingTitle, setEditingTitle] = useState(false);
  const title = sectionState?.title ?? "";

  
    const isOpen = sectionState?.isOpen ?? false;

  // Sync Local → Redux
  const syncRedux = (t: string, i: ICustomItem[]) => {
    dispatch(setCustomSection({ title: t, items: i }));
  };


  const addItem = () => {
    const newItem: ICustomItem = {
      id: crypto.randomUUID(),
      content: "",
    };
    const updated = [...items, newItem];
    setItems(updated);
    syncRedux(title, updated);
  };

  const updateItem = (id: string, field: keyof ICustomItem, value: any) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updated);
    syncRedux(title, updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    syncRedux(title, updated);
  };

  // ---------- PROGRESS LOGIC ----------
const progress = useMemo(() => {
  const hasTitle = title.trim() !== "";
  const hasFilledItems = items.some((item) => item.content.trim() !== "");

  if (!hasTitle) return 0;

  // Si solo hay título
  if (hasTitle && !hasFilledItems) return 50;

  // Título + al menos 1 ítem escrito
  return 100;
}, [title, items]);

// Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "customSection", progress }));
}, [progress, dispatch]);


  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "customSection", progress }));
}, [progress, dispatch]);

const progressColorClass = useMemo(() => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue"; // 100%
}, [progress]);

  return (
    <div className={`custom-section ${!isOpen ? "closed" : ""}`}>
      <div className="custom-section__header">
        {/* TÍTULO EDITABLE */}
                <div className="editable-title">
                  {!editingTitle ? (
                    <h2
                      className="title-display"
                      onClick={() => setEditingTitle(true)}
                    >
                      <BiLayerPlus /> {title}
                    </h2>
                  ) : (
                    <input
                      className="title-input"
                      autoFocus
                      placeholder="Título de la sección personalizada"
                      value={title}
                      onChange={(e) => {
                      const newTitle = e.target.value;

                      // Título del panel (usado por cvSections)
                      dispatch(updateSectionTitle({ name: "customSection", title: newTitle }));

                      // Guardar título REAL de la sección personalizada en Redux
                      dispatch(setCustomSection({ title: newTitle, items }));
                    }}
                    onBlur={() => setEditingTitle(false)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                    />
                  )}
                </div>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn toggle-btn-custom ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("customSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="custom-section__content">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <div className="field full">
                <label>Contenido del ítem</label>
                <textarea
                  placeholder="Ej: Lideré un proyecto de mejora continua..."
                  value={item.content}
                  onChange={(e) =>
                    updateItem(item.id, "content", e.target.value)
                  }
                />
              </div>

              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addItem}>
            <FiPlus /> Agregar Ítem
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomSection;
