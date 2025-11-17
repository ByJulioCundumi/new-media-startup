import React, { useEffect, useState } from "react";
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

const ReferencesSection: React.FC = () => {
  const dispatch = useDispatch();

  const references = useSelector(
    (state: IState) => state.referencesEntries
  );

  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <div className={`references-section ${!isOpen ? "closed" : ""}`}>
      <div className="references-section__header">
        <h2><MdOutlineRateReview /> Referencias Laborales</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
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
