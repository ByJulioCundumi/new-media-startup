import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiPhone } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./contactsection.scss";

import type { IContactEntry } from "../../../interfaces/IContact";
import type { IState } from "../../../interfaces/IState";

import {
  addContactEntry,
  removeContactEntry,
  updateContactEntry,
} from "../../../reducers/contactSlice";
import {
  toggleSectionOpen,
  setSectionProgress,
  updateSectionTitle,
} from "../../../reducers/cvSectionsSlice";

const ContactSection: React.FC = () => {
  const dispatch = useDispatch();

  const contacts: IContactEntry[] = useSelector(
    (state: IState) => state.contactEntries || []
  );

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "contactSection")
  );

  const isOpen = sectionState?.isOpen ?? false;
  const title = sectionState?.title ?? "Contacto";

  const [editingTitle, setEditingTitle] = useState(false);

  // Activar sección creando Teléfono + Email
  const activateSection = () => {
    dispatch(addContactEntry({ id: crypto.randomUUID(), type: "Teléfono", value: "" }));
    dispatch(addContactEntry({ id: crypto.randomUUID(), type: "Email", value: "" }));
  };

  const addExtraContact = () => {
    dispatch(addContactEntry({ id: crypto.randomUUID(), type: "", value: "" }));
  };

  const updateContact = (id: string, field: keyof IContactEntry, value: string) => {
    dispatch(updateContactEntry({ id, field, value }));
  };

  const removeContact = (id: string) => {
    dispatch(removeContactEntry(id));
  };

  // === PROGRESO: todos los campos cuentan ===
  const progress = useMemo(() => {
    if (contacts.length === 0) return 0;

    let totalFields = 0;
    let completedFields = 0;

    contacts.forEach((c) => {
      // Teléfono y Email: solo value cuenta
      if (c.type === "Teléfono" || c.type === "Email") {
        totalFields += 1;
        if (c.value?.trim()) completedFields += 1;
      } else {
        // Otros: type + value
        totalFields += 2;
        if (c.type?.trim()) completedFields += 1;
        if (c.value?.trim()) completedFields += 1;
      }
    });

    return Math.round((completedFields / totalFields) * 100);
  }, [contacts]);

  useEffect(() => {
    dispatch(setSectionProgress({ name: "contactSection", progress }));
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress === 0) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  return (
    <div className={`contact-section ${!isOpen ? "closed" : ""}`}>
      <div className="contact-section__header">
        <div className="editable-title">
          {!editingTitle ? (
            <h2 className="title-display" onClick={() => setEditingTitle(true)}>
              <FiPhone /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "contactSection", title: e.target.value }))
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
          onClick={() => dispatch(toggleSectionOpen("contactSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="contact-section__content">
          {/* Estado vacío */}
          {contacts.length === 0 ? (
            <div className="empty-state">
              <button className="add-btn add-btn-full primary" onClick={activateSection}>
                <FiPlus /> Agregar Contactos
              </button>
            </div>
          ) : (
            <>
              {contacts.map((c) => (
                <div className="contact-card" key={c.id}>
                  <div className="card-grid">
                    <div className="field">
                      <label>Tipo</label>
                      <input
                        type="text"
                        value={c.type}
                        readOnly={c.type === "Teléfono" || c.type === "Email"}
                        placeholder="Ej: LinkedIn, GitHub, Web"
                        onChange={(e) => updateContact(c.id, "type", e.target.value)}
                        className={c.type === "Teléfono" || c.type === "Email" ? "readonly" : ""}
                      />
                    </div>

                    <div className="field">
                      <label>Contacto</label>
                      <input
                        type={c.type === "Email" ? "email" : "text"}
                        placeholder={
                          c.type === "Teléfono"
                            ? "+57 300 000 0000"
                            : c.type === "Email"
                            ? "tuemail@dominio.com"
                            : "Enlace o dato de contacto"
                        }
                        value={c.value}
                        onChange={(e) => updateContact(c.id, "value", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Botón de eliminar para TODOS los campos (incluyendo Teléfono y Email) */}
                  <button className="remove-btn" onClick={() => removeContact(c.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}

              <button className="add-btn" onClick={addExtraContact}>
                <FiPlus /> Agregar Otro Contacto
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactSection;