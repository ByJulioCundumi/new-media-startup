// components/create-new-cv-popup/CreateNewCvPopup.tsx
import React, { useState } from "react";
import "./CreateNewCvPopup.scss";

import { useDispatch, useSelector } from "react-redux";
import { setCreateCvPopup, setSelectedCvTitle, setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import { IoClose } from "react-icons/io5";
import type { IState } from "../../interfaces/IState";
import { createCvApi } from "../../api/cv";
import { useNavigate } from "react-router-dom";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";

// ← CONFIGURACIÓN INICIAL DE SECCIONES (igual que en el backend)
const defaultCvSections = {
  sections: [
    { name: "identitySection", title: "Sobre Mi", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "header" },
    { name: "contactSection", title: "Contacto", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "vertical" },
    { name: "profileSection", title: "Perfil", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
    { name: "educationSection", title: "Educación", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
    { name: "experienceSection", title: "Experiencia", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
    { name: "skillSection", title: "Habilidades", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "vertical" },
    { name: "languageSection", title: "Idiomas", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "vertical" },
    { name: "personalInfoSection", title: "Detalles", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "vertical" },
    { name: "linkSection", title: "Enlaces", enabled: false, progress: 0, isOpen: false, isEditorOpen: false, orientation: "vertical" },
    { name: "courseSection", title: "Cursos y Certificados", enabled: false, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
    { name: "hobbieSection", title: "Pasatiempos", enabled: false, progress: 0, isOpen: false, isEditorOpen: false, orientation: "vertical" },
    { name: "referenceSection", title: "Referencias Laborales", enabled: false, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
    { name: "awardSection", title: "Premios", enabled: false, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
    { name: "customSection", title: "Campo Personalizado", enabled: true, progress: 0, isOpen: false, isEditorOpen: false, orientation: "horizontal" },
  ],
  order: [
    "identitySection", "contactSection", "profileSection", "educationSection",
    "experienceSection", "skillSection", "languageSection", "personalInfoSection",
    "linkSection", "courseSection", "hobbieSection", "referenceSection",
    "awardSection", "customSection"
  ]
};

export default function CreateNewCvPopup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector((state: IState) => state.cvCreation.isOpen);
  const selectedTemplateId = useSelector((state: IState) => state.cvCreation.selectedTemplateId);
  const isLogged = useSelector((state: IState) => state.user.logged); // ← Asume que tienes este selector

  const [cvTitle, setCvTitle] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!cvTitle.trim() || !selectedTemplateId) return;

    try {
      setLoading(true);

      if (isLogged) {
        // Usuario logueado → crear en backend
        const created = await createCvApi(cvTitle.trim(), selectedTemplateId);
        dispatch(setCreateCvPopup(false));
        dispatch(setTemplatePopupOpen(false));
        navigate(`/create/${created.id}`);
      } else {
        // Usuario NO logueado → crear borrador en localStorage
        const localId = crypto.randomUUID();

        const draftCv = {
          localId,
          isDraft: true,
          cvTitle: cvTitle.trim(),
          templateId: selectedTemplateId,

          // Datos vacíos iniciales
          identity: {},
          profileContent: "",
          contactEntries: [],
          educationEntries: [],
          experienceEntries: [],
          skillsEntries: [],
          languagesEntries: [],
          linksEntries: [],
          coursesEntries: [],
          hobbiesEntries: [],
          referencesEntries: [],
          awardsEntries: [],
          customEntries: [],
          personalInfoEntries: [],

          // ← ¡CRUCIAL! Estructura completa de secciones
          cvSections: defaultCvSections,

          colorFont: {
            defaults: {},
            selected: {},
          },

          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Guardar en localStorage
        const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
        existingDrafts.push(draftCv);
        localStorage.setItem("draftCvs", JSON.stringify(existingDrafts));

        // Cerrar popups y navegar al editor con el localId
        dispatch(setCreateCvPopup(false));
        dispatch(setTemplatePopupOpen(false));
        dispatch(setSelectedCvTitle(cvTitle.trim()));
        navigate(`/create/${localId}`);
      }
    } catch (err) {
      console.error("Error creando CV:", err);
      alert("Hubo un error al crear el CV");
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
        <p className="subtitle">
          {isLogged 
            ? "Configura rápidamente un nuevo CV desde cero." 
            : "Puedes crear un borrador sin iniciar sesión. Se guardará en tu navegador."}
        </p>

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
          {loading ? "Creando..." : isLogged ? "Crear CV" : "Crear borrador local"}
        </button>
      </div>
    </div>
  );
}