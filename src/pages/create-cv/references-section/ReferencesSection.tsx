import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./referencessection.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  addReferenceEntry,
  removeReferenceEntry,
  setReferencesEntries,
  updateReferenceEntry,
} from "../../../reducers/referencesSlice";
import { MdOutlineRateReview } from "react-icons/md";
import { setSectionProgress, updateSectionTitle } from "../../../reducers/cvSectionsSlice";
import { toggleSectionOpen } from "../../../reducers/editorsSlice";

const ReferencesSection: React.FC = () => {
  const dispatch = useDispatch();

  const references = useSelector(
    (state: IState) => state.referencesEntries
  );

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "referenceSection")
  );

  const sectionEditorState = useSelector((state: IState) =>
    state.cvSectionsEditors.sections.find((s) => s.name === "referenceSection")
  );
            
    const isOpen = sectionEditorState?.isOpen ?? false;

  // Inicializar si viene vacío
  useEffect(() => {
    if (!references || references.length === 0) {
      dispatch(setReferencesEntries([]));
    }
  }, []);

  const addReference = () => {
    dispatch(
      addReferenceEntry({
        id: crypto.randomUUID(),
        name: "",
        company: "",
        phone: "",
        email: "",
      })
    );
  };

  const updateReference = (
    id: string,
    field: "name" | "company" | "phone" | "email",
    value: string
  ) => {
    dispatch(updateReferenceEntry({ id, field, value }));
  };

  const removeReference = (id: string) => {
    dispatch(removeReferenceEntry(id));
  };

  // ==========================
  // CÁLCULO DE PORCENTAJE
  // ==========================
  const progress = useMemo(() => {
    if (!references.length) return 0;

    const totalFields = references.length * 4;
    let filledFields = 0;

    references.forEach((ref) => {
      if (ref.name?.trim()) filledFields++;
      if (ref.company?.trim()) filledFields++;
      if (ref.phone?.trim()) filledFields++;
      if (ref.email?.trim()) filledFields++;
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [references]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "referenceSection", progress }));
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
      const title = sectionState?.title ?? "Referencias Laborales";

  return (
    <div className={`references-section ${!isOpen ? "closed" : ""}`}>
      <div className="references-section__header">
        {/* TÍTULO EDITABLE */}
      <div className="editable-title">
        {!editingTitle ? (
          <h2
            className="title-display"
            onClick={() => setEditingTitle(true)}
          >
            <MdOutlineRateReview /> {title}
          </h2>
        ) : (
          <input
            className="title-input"
            autoFocus
            value={title}
            onChange={(e) =>
              dispatch(updateSectionTitle({ name: "referenceSection", title: e.target.value }))
            }
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
          />
        )}
      </div>

        {/* BADGE DE PROGRESO */}
        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("referenceSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="references-section__content">
          {references.map((ref) => (
            <div className="reference-card" key={ref.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={ref.name}
                    onChange={(e) =>
                      updateReference(ref.id, "name", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Compañía</label>
                  <input
                    type="text"
                    placeholder="Ej: Empresa XYZ"
                    value={ref.company}
                    onChange={(e) =>
                      updateReference(ref.id, "company", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    placeholder="Ej: +57 300 1234567"
                    value={ref.phone}
                    onChange={(e) =>
                      updateReference(ref.id, "phone", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Ej: juan.perez@email.com"
                    value={ref.email}
                    onChange={(e) =>
                      updateReference(ref.id, "email", e.target.value)
                    }
                  />
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeReference(ref.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addReference}>
            <FiPlus /> Agregar Referencia
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferencesSection;
