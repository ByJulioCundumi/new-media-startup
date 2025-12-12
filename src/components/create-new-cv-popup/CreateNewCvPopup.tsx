// CreateNewCvPopup.tsx
import React, { useState } from "react";
import "./CreateNewCvPopup.scss";

import { useDispatch, useSelector } from "react-redux";
import { setCreateCvPopup } from "../../reducers/cvCreationSlice";
import { IoClose } from "react-icons/io5";
import type { IState } from "../../interfaces/IState";
import { createCvApi } from "../../api/cv";
import { useNavigate } from "react-router-dom";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";

export default function CreateNewCvPopup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector((state: IState) => state.cvCreation.isOpen);
  const selectedTemplateId = useSelector((state: IState) => state.cvCreation.selectedTemplateId);

  const [cvTitle, setCvTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 ESTE ES EL FIX
  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!cvTitle.trim()) return;

    try {
      setLoading(true);
      const created = await createCvApi(cvTitle, selectedTemplateId);

      dispatch(setCreateCvPopup(false));
      dispatch(setTemplatePopupOpen(false));
      navigate(`/create/${created.id}`);

    } catch (err) {
      console.error("Error creando CV:", err);
      alert("Hubo un error creando el CV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createcv-overlay">
      <div className="createcv-modal">

        <button className="close-btn" onClick={() => dispatch(setCreateCvPopup(false))}>
          <IoClose />
        </button>

        <h2>Crear nuevo CV</h2>
        <p className="subtitle">Configura rápidamente un nuevo CV desde cero.</p>

        <div className="field">
          <label>Título del CV</label>
          <input
            type="text"
            placeholder="Ej: CV Desarrollador Frontend"
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
          />
        </div>

        <button
          className={`create-btn ${loading ? "loading" : ""}`}
          disabled={!cvTitle.trim() || loading}
          onClick={handleCreate}
        >
          {loading ? "Creando..." : "Crear CV"}
        </button>

      </div>
    </div>
  );
}
