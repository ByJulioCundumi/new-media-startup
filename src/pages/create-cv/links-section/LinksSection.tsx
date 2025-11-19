import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./linkssection.scss";
import type { ILinkEntry } from "../../../interfaces/ILinks";
import type { IState } from "../../../interfaces/IState";
import { addLinkEntry, removeLinkEntry, setLinksEntries, updateLinkEntry } from "../../../reducers/linksSlice";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen, updateSectionTitle } from "../../../reducers/cvSectionsSlice";

interface LinksSectionProps {
  initialData?: ILinkEntry[];
  onChange?: (data: ILinkEntry[]) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ initialData, onChange }) => {
  const dispatch = useDispatch();
  const links = useSelector((state: IState) => state.linksEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "linkSection")
  );
          
      const isOpen = sectionState?.isOpen ?? false;

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
      visible: true, // nuevo campo
    })
  );
};

const updateLink = (
  id: string,
  field: keyof ILinkEntry,
  value: string | boolean
) => {
  dispatch(updateLinkEntry({ id, field, value }));
};

  const remove = (id: string) => {
    dispatch(removeLinkEntry(id));
  };

  // -------- PROGRESS LOGIC ----------
  const progress = useMemo(() => {
    const fieldsPerEntry = 2; // name + url
    const totalFields = fieldsPerEntry * links.length;

    if (totalFields === 0) return 0;

    let completed = 0;
    for (const link of links) {
      if (link.name?.trim()) completed++;
      if (link.url?.trim()) completed++;
    }

    return Math.round((completed / totalFields) * 100);
  }, [links]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "linkSection", progress }));
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
      const title = sectionState?.title ?? "Enlaces";

  return (
    <div className={`links-section ${!isOpen ? "closed" : ""}`}>
      <div className="links-section__header">
        {/* TÍTULO EDITABLE */}
      <div className="editable-title">
        {!editingTitle ? (
          <h2
            className="title-display"
            onClick={() => setEditingTitle(true)}
          >
            <FiLink /> {title}
          </h2>
        ) : (
          <input
            className="title-input"
            autoFocus
            value={title}
            onChange={(e) =>
              dispatch(updateSectionTitle({ name: "linkSection", title: e.target.value }))
            }
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
          />
        )}
      </div>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("linkSection"))}
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

              <div className=" switch-field">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={link.visible}
                    onChange={(e) => updateLink(link.id, "visible", e.target.checked)}
                  />
                  <span className="slider" />
                </label>
                <label>
                  {link.visible
                    ? "Enlace Visible"
                    : "Enlace Oculto"}
                </label>
              </div>

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
