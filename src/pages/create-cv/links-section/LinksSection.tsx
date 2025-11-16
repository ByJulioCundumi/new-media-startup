import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./linkssection.scss";

interface LinkItem {
  id: string;
  name: string;
  url: string;
}

interface LinksSectionProps {
  initialData?: LinkItem[];
  onChange?: (data: LinkItem[]) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [links, setLinks] = useState<LinkItem[]>(initialData || []);

  const addLink = () => {
    const newLink: LinkItem = {
      id: crypto.randomUUID(),
      name: "",
      url: "",
    };
    const updated = [...links, newLink];
    setLinks(updated);
    onChange?.(updated);
  };

  const updateLink = (id: string, field: keyof LinkItem, value: string) => {
    const updated = links.map((l) =>
      l.id === id ? { ...l, [field]: value } : l
    );
    setLinks(updated);
    onChange?.(updated);
  };

  const removeLink = (id: string) => {
    const updated = links.filter((l) => l.id !== id);
    setLinks(updated);
    onChange?.(updated);
  };

  return (
    <div className={`links-section ${!isOpen ? "closed" : ""}`}>
      <div className="links-section__header">
        <h2>Enlaces Relevantes</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="links-section__content">
          {links.map((link) => (
            <div className="link-card" key={link.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Nombre del enlace</label>
                  <input
                    type="text"
                    placeholder="Ej: Portafolio"
                    value={link.name}
                    onChange={(e) => updateLink(link.id, "name", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>URL</label>
                  <input
                    type="text"
                    placeholder="Ej: https://miportafolio.com"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                  />
                </div>
              </div>

              <button className="remove-btn" onClick={() => removeLink(link.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addLink}>
            <FiPlus /> Agregar Enlace
          </button>
        </div>
      )}
    </div>
  );
};

export default LinksSection;
