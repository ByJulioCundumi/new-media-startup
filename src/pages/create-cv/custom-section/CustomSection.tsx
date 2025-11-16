import React, { useState } from "react";
import { FiPlus, FiTrash2, FiX, FiChevronDown } from "react-icons/fi";
import "./customsection.scss";

interface CustomItem {
  id: string;
  content: string;
  link?: string;
  showLink?: boolean;
}

interface CustomSectionProps {
  initialTitle?: string;
  initialItems?: CustomItem[];
  onChange?: (title: string, items: CustomItem[]) => void;
}

const CustomSection: React.FC<CustomSectionProps> = ({
  initialTitle = "",
  initialItems = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(initialTitle);
  const [items, setItems] = useState<CustomItem[]>(initialItems);

  const updateTitle = (value: string) => {
    setTitle(value);
    onChange?.(value, items);
  };

  const addItem = () => {
    const newItem: CustomItem = { id: crypto.randomUUID(), content: "", showLink: false };
    const updated = [...items, newItem];
    setItems(updated);
    onChange?.(title, updated);
  };

  const updateItem = (id: string, field: keyof CustomItem, value: any) => {
    const updated = items.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setItems(updated);
    onChange?.(title, updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    onChange?.(title, updated);
  };

  const toggleLink = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, showLink: !item.showLink, link: item.showLink ? "" : item.link } : item
    );
    setItems(updated);
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
        <button className={`toggle-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
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

              <div className="field full">
                {item.showLink ? (
                  <div className="link-input-row">
                    <label>Enlace opcional</label>
                    <div className="link-input-container">
                      <input
                        type="text"
                        placeholder="Ej: https://enlace.com"
                        value={item.link || ""}
                        onChange={(e) => updateItem(item.id, "link", e.target.value)}
                      />
                      <button type="button" className="remove-link-btn" onClick={() => toggleLink(item.id)}>
                        <FiX />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="add-link-btn" onClick={() => toggleLink(item.id)}>
                    <FiPlus /> Agregar enlace
                  </button>
                )}
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
