import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./customsection.scss";
import type { IState } from "../../../interfaces/IState";
import type { ICustomItem } from "../../../interfaces/ICustom";
import { setCustomSection } from "../../../reducers/customSlice";
import { BiLayerPlus } from "react-icons/bi";
import { setSectionProgress } from "../../../reducers/cvSectionsSlice";

const CustomSection: React.FC = () => {
  const dispatch = useDispatch();

  const { title: savedTitle, items: savedItems } = useSelector(
    (state: IState) => state.customEntry
  );

  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(savedTitle);
  const [items, setItems] = useState<ICustomItem[]>(savedItems);

  // Sync Redux → Local
  useEffect(() => {
    setTitle(savedTitle);
    setItems(savedItems);
  }, [savedTitle, savedItems]);

  // Sync Local → Redux
  const syncRedux = (t: string, i: ICustomItem[]) => {
    dispatch(setCustomSection({ title: t, items: i }));
  };

  const updateTitle = (value: string) => {
    setTitle(value);
    syncRedux(value, items);
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
    const total = 1 + items.length; // 1 título + N ítems
    if (total === 0) return 0;

    let completed = 0;

    if (title?.trim()) completed++;

    for (const item of items) {
      if (item.content?.trim()) {
        completed++;
      }
    }

    return Math.round((completed / total) * 100);
  }, [title, items]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "customSection", progress }));
}, [progress, dispatch]);

  return (
    <div className={`custom-section ${!isOpen ? "closed" : ""}`}>
      <div className="custom-section__header">
        <BiLayerPlus />

        <input
          className="section-title"
          type="text"
          placeholder="Título de la sección personalizada"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
        />

        <div className="progress-indicator">
          {progress}%
        </div>

        <button
          className={`toggle-btn toggle-btn-custom ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
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
