import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiPhone } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./contactsection.scss";

import type { IContactEntry } from "../../../interfaces/IContact";
import type { IState } from "../../../interfaces/IState";

import {
  addContactEntry,
  removeContactEntry,
  setContactEntries,
  updateContactEntry,
} from "../../../reducers/contactSlice";

import {
  toggleSectionOpen,
  setSectionProgress,
  updateSectionTitle,
} from "../../../reducers/cvSectionsSlice";

interface ContactSectionProps {
  initialData?: IContactEntry[];
  onChange?: (data: IContactEntry[]) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  initialData,
  onChange,
}) => {
  const dispatch = useDispatch();

  const contacts: IContactEntry[] = useSelector(
    (state: IState) => state.contactEntries ?? []
  );

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "contactSection")
  );

  const isOpen = sectionState?.isOpen ?? false;

  // -----------------------------
  // 🔵 STATE PARA EDICIÓN DEL TÍTULO
  // -----------------------------
  const [editingTitle, setEditingTitle] = useState(false);
  const title = sectionState?.title ?? "Contacto";

  // -----------------------------
  // Cargar initialData
  // -----------------------------
  useEffect(() => {
    if (initialData) {
      dispatch(setContactEntries(initialData));
    }
  }, [initialData, dispatch]);

  // Crear Teléfono y Email si no existen
  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(
        setContactEntries([
          {
            id: crypto.randomUUID(),
            type: "Teléfono",
            value: "",
          },
          {
            id: crypto.randomUUID(),
            type: "Email",
            value: "",
          },
        ])
      );
    }
  }, [contacts.length, dispatch]);

  // Notificar cambios al padre
  useEffect(() => {
    onChange?.(contacts);
  }, [contacts, onChange]);

  const addContact = () => {
    dispatch(
      addContactEntry({
        id: crypto.randomUUID(),
        type: "",
        value: "",
      })
    );
  };

  const updateContact = (
    id: string,
    field: keyof IContactEntry,
    value: string
  ) => {
    dispatch(updateContactEntry({ id, field, value }));
  };

  const remove = (id: string) => {
    dispatch(removeContactEntry(id));
  };

  // ---------- PROGRESS ----------
  const progress = useMemo(() => {
    const safe = Array.isArray(contacts) ? contacts : [];

    let completed = 0;
    let total = 0;

    safe.forEach((c, index) => {
      if (index < 2) {
        total += 1;
        if (c.value?.trim()) completed += 1;
      } else {
        total += 2;
        if (c.type?.trim()) completed++;
        if (c.value?.trim()) completed++;
      }
    });

    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }, [contacts]);

  useEffect(() => {
    dispatch(setSectionProgress({ name: "contactSection", progress }));
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  return (
    <div className={`contact-section ${!isOpen ? "closed" : ""}`}>
      <div className="contact-section__header">
        {/* TÍTULO EDITABLE */}
        <div className="editable-title">
          {!editingTitle ? (
            <h2
              className="title-display"
              onClick={() => setEditingTitle(true)}
            >
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
          {contacts.map((c, index) => (
            <div className="contact-card" key={c.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Tipo</label>

                  <input
                    type="text"
                    value={c.type}
                    readOnly={index < 2}
                    placeholder="Ej: WhatsApp, LinkedIn"
                    onChange={(e) =>
                      index >= 2 &&
                      updateContact(c.id, "type", e.target.value)
                    }
                    className={index < 2 ? "readonly" : ""}
                  />
                </div>

                <div className="field">
                  <label>Contacto</label>
                  <input
                    type="text"
                    placeholder={
                      c.type === "Teléfono"
                        ? "Ej: +57 300 000 0000"
                        : c.type === "Email"
                        ? "Ej: usuario@mail.com"
                        : "Ej: enlace o dato de contacto"
                    }
                    value={c.value}
                    onChange={(e) =>
                      updateContact(c.id, "value", e.target.value)
                    }
                  />
                </div>
              </div>

              {index >= 2 && (
                <button className="remove-btn" onClick={() => remove(c.id)}>
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}

          <button className="add-btn" onClick={addContact}>
            <FiPlus /> Agregar Contacto
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactSection;
