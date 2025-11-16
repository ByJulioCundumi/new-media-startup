import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPlus, FiTrash2, FiX, FiChevronDown } from "react-icons/fi";
import "./customsection.scss";
import type { IState } from "../../../interfaces/IState";
import type { ICustomItem } from "../../../interfaces/ICustom";
import { setCustomSection } from "../../../reducers/customSlice";

const CustomSection: React.FC = () => {
  const dispatch = useDispatch();

  // Obtener sección almacenada en Redux
  const { title: savedTitle, items: savedItems } = useSelector(
    (state: IState) => state.customEntry
  );

  // Estados locales
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(savedTitle);
  const [items, setItems] = useState<ICustomItem[]>(savedItems);

  // Para sincronizar Redux → Local al cargar
  useEffect(() => {
    setTitle(savedTitle);
    setItems(savedItems);
  }, [savedTitle, savedItems]);

  // Para sincronizar Local → Redux al modificar
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

  return (
    <div className={`custom-section ${!isOpen ? "closed" : ""}`}>
      <div className="custom-section__header">
        <input
          className="section-title"
          type="text"
          placeholder="Título de la sección personalizada"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
        />
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
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
                  onChange={(e) => updateItem(item.id, "content", e.target.value)}
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
