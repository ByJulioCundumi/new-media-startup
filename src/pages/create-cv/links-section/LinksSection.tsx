import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./linkssection.scss";
import type { ILinkEntry } from "../../../interfaces/ILinks";
import type { IState } from "../../../interfaces/IState";
import { addLinkEntry, removeLinkEntry, setLinksEntries, updateLinkEntry } from "../../../reducers/linksSlice";

interface LinksSectionProps {
  initialData?: ILinkEntry[];
  onChange?: (data: ILinkEntry[]) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ initialData, onChange }) => {
  const dispatch = useDispatch();
  const links = useSelector((state: IState) => state.linksEntries);

  const [isOpen, setIsOpen] = useState(true);

  // Si viene initialData, se sincroniza solo 1 vez
  useEffect(() => {
    if (initialData) {
      dispatch(setLinksEntries(initialData));
    }
  }, [initialData, dispatch]);

  // Notificar cambios al padre si envía onChange
  useEffect(() => {
    onChange?.(links);
  }, [links, onChange]);

  const addLink = () => {
    dispatch(
      addLinkEntry({
        id: crypto.randomUUID(),
        name: "",
        url: "",
      })
    );
  };

  const updateLink = (id: string, field: keyof ILinkEntry, value: string) => {
    dispatch(updateLinkEntry({ id, field, value }));
  };

  const remove = (id: string) => {
    dispatch(removeLinkEntry(id));
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

              <button className="remove-btn" onClick={() => remove(link.id)}>
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
