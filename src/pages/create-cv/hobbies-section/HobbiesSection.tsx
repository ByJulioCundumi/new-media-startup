import React, { useEffect } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./hobbiessection.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import { addHobbyEntry, removeHobbyEntry, setHobbiesEntries, updateHobbyEntry } from "../../../reducers/hobbiesSlice";

const HobbiesSection: React.FC = () => {
  const dispatch = useDispatch();

  const hobbies = useSelector(
    (state: IState) => state.hobbiesEntries
  );

  const [isOpen, setIsOpen] = React.useState(true);

  // Inicializar si viene vacío
  useEffect(() => {
    if (!hobbies || hobbies.length === 0) {
      dispatch(setHobbiesEntries([]));
    }
  }, []);

  const addHobby = () => {
    dispatch(
      addHobbyEntry({
        id: crypto.randomUUID(),
        name: "",
      })
    );
  };

  const updateHobby = (id: string, value: string) => {
    dispatch(updateHobbyEntry({ id, name: value }));
  };

  const removeHobby = (id: string) => {
    dispatch(removeHobbyEntry(id));
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
