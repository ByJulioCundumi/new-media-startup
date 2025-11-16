import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./referencessection.scss";

interface ReferenceEntry {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

interface ReferencesSectionProps {
  initialData?: ReferenceEntry[];
  onChange?: (data: ReferenceEntry[]) => void;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [references, setReferences] = useState<ReferenceEntry[]>(initialData || []);

  const addReference = () => {
    const newReference: ReferenceEntry = {
      id: crypto.randomUUID(),
      name: "",
      company: "",
      phone: "",
      email: "",
    };
    const updated = [...references, newReference];
    setReferences(updated);
    onChange?.(updated);
  };

  const updateReference = (id: string, field: keyof ReferenceEntry, value: string) => {
    const updated = references.map((r) => (r.id === id ? { ...r, [field]: value } : r));
    setReferences(updated);
    onChange?.(updated);
  };

  const removeReference = (id: string) => {
    const updated = references.filter((r) => r.id !== id);
    setReferences(updated);
    onChange?.(updated);
  };

  return (
    <div className={`references-section ${!isOpen ? "closed" : ""}`}>
      <div className="references-section__header">
        <h2>Referencias Laborales</h2>
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
                    onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Compañía</label>
                  <input
                    type="text"
                    placeholder="Ej: Empresa XYZ"
                    value={ref.company}
                    onChange={(e) => updateReference(ref.id, "company", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    placeholder="Ej: +57 300 1234567"
                    value={ref.phone}
                    onChange={(e) => updateReference(ref.id, "phone", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Ej: juan.perez@email.com"
                    value={ref.email}
                    onChange={(e) => updateReference(ref.id, "email", e.target.value)}
                  />
                </div>
              </div>

              <button className="remove-btn" onClick={() => removeReference(ref.id)}>
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
