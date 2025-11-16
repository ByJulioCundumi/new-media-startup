import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./hobbiessection.scss";

interface HobbyEntry {
  id: string;
  name: string;
}

interface HobbiesSectionProps {
  initialData?: HobbyEntry[];
  onChange?: (data: HobbyEntry[]) => void;
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hobbies, setHobbies] = useState<HobbyEntry[]>(initialData || []);

  const addHobby = () => {
    const newHobby: HobbyEntry = {
      id: crypto.randomUUID(),
      name: "",
    };
    const updated = [...hobbies, newHobby];
    setHobbies(updated);
    onChange?.(updated);
  };

  const updateHobby = (id: string, value: string) => {
    const updated = hobbies.map((h) => (h.id === id ? { ...h, name: value } : h));
    setHobbies(updated);
    onChange?.(updated);
  };

  const removeHobby = (id: string) => {
    const updated = hobbies.filter((h) => h.id !== id);
    setHobbies(updated);
    onChange?.(updated);
  };

  return (
    <div className={`hobbies-section ${!isOpen ? "closed" : ""}`}>
      <div className="hobbies-section__header">
        <h2>Pasatiempos</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="hobbies-section__content">
          {hobbies.map((hobby) => (
            <div className="hobby-card" key={hobby.id}>
              <input
                type="text"
                placeholder="Ej: Ciclismo..."
                value={hobby.name}
                onChange={(e) => updateHobby(hobby.id, e.target.value)}
              />
              <button className="remove-btn" onClick={() => removeHobby(hobby.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addHobby}>
            <FiPlus /> Agregar Pasatiempo
          </button>
        </div>
      )}
    </div>
  );
};

export default HobbiesSection;
