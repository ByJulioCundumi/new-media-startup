// components/create-new-cv-popup/CreateNewCvPopup.tsx
import React, { useState, useEffect } from "react";
import "./CreateNewCvPopup.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setCreateCvPopup,
  setSelectedCvTitle,
  setSelectedTemplateId,
} from "../../reducers/cvCreationSlice";
import { IoClose } from "react-icons/io5";
import type { IState } from "../../interfaces/IState";
import { createCvApi } from "../../api/cv"; // Ya no necesitamos getCvCountApi
import { useNavigate } from "react-router-dom";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";

// CONFIGURACIÓN INICIAL DE SECCIONES (igual que backend)
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
    "identitySection",
    "contactSection",
    "profileSection",
    "educationSection",
    "experienceSection",
    "skillSection",
    "languageSection",
    "personalInfoSection",
    "linkSection",
    "courseSection",
    "hobbieSection",
    "referenceSection",
    "awardSection",
    "customSection",
  ],
};

export default function CreateNewCvPopup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector((state: IState) => state.cvCreation.isOpen);
  const selectedTemplateId = useSelector((state: IState) => state.cvCreation.selectedTemplateId);
  const isLogged = useSelector((state: IState) => state.user.logged);
  const { subscriptionExpiresAt, subscriptionPlan } = useSelector((state: IState) => state.user);

  const [cvTitle, setCvTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  if (!isOpen) return null;

  const hasValidSubscription = hasValidSubscriptionTime(subscriptionExpiresAt);
  const canCreateInCloud = isLogged && hasValidSubscription && isOnline;

  // Función para crear borrador local
  const createLocalDraft = (title: string, templateId: string): string => {
    const localId = crypto.randomUUID();

    const draftCv = {
      localId,
      isDraft: true,
      cvTitle: title,
      templateId,
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
      cvSections: defaultCvSections,
      colorFont: { defaults: {}, selected: {} },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
    existingDrafts.push(draftCv);
    localStorage.setItem("draftCvs", JSON.stringify(existingDrafts));

    return localId;
  };

  // Detectar cambios en la conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleCreate = async () => {
    if (!cvTitle.trim() || !selectedTemplateId) return;

    const title = cvTitle.trim();
    setLoading(true);

    try {
      let cvIdToNavigate: string;

      if (canCreateInCloud) {
        // Solo intenta crear en la nube si todo está OK
        const created = await createCvApi(title, selectedTemplateId);
        cvIdToNavigate = created.id;
      } else {
        // En todos los demás casos → local
        cvIdToNavigate = createLocalDraft(title, selectedTemplateId);

        let message = "El CV se ha creado como borrador local en tu navegador.";

        if (!isLogged) {
          message += "\nInicia sesión para guardar en la nube.";
        } else if (!isOnline) {
          message += "\nNo hay conexión a internet. Se guardó localmente.";
        }

        alert(message);
      }

      // Navegación
      dispatch(setCreateCvPopup(false));
      dispatch(setTemplatePopupOpen(false));
      dispatch(setSelectedCvTitle(title));
      dispatch(setSelectedTemplateId(selectedTemplateId));
      navigate(`/create/${cvIdToNavigate}`);
    } catch (err: any) {
      console.error("Error al crear CV en la nube:", err);

      // Fallback seguro: siempre crear local si falla la nube
      const localId = createLocalDraft(title, selectedTemplateId);
      alert(
        "No se pudo guardar en la nube (error de conexión o servidor).\n\n" +
        "El CV se ha creado como borrador local. Podrás seguir editándolo."
      );

      dispatch(setCreateCvPopup(false));
      dispatch(setTemplatePopupOpen(false));
      dispatch(setSelectedCvTitle(title));
      dispatch(setSelectedTemplateId(selectedTemplateId));
      navigate(`/create/${localId}`);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !cvTitle.trim() || loading;

  return (
    <div className="createcv-overlay">
      <div className="createcv-modal">
        <button className="close-btn" onClick={() => dispatch(setCreateCvPopup(false))}>
          <IoClose />
        </button>

        <h2>Crear nuevo CV</h2>

        <p className="subtitle">
          {isLogged ? (
            hasValidSubscription ? (
              isOnline ? (
                `Plan ${subscriptionPlan === "MONTHLY" ? "Mensual:": subscriptionPlan === "ANNUAL" && "Anual:"} CVs ilimitados en la nube.`
              ) : (
                <span style={{ color: "#e67e22", fontWeight: "500" }}>
                  Sin conexión → el CV se guardará localmente
                </span>
              )
            ) : (
              <span style={{ color: "#e74c3c", fontWeight: "500" }}>
              </span>
            )
          ) : (
            "Puedes crear un borrador sin iniciar sesión."
          )}
        </p>

        <div className="field">
          <label>Título del CV</label>
          <input
            type="text"
            placeholder="Ej: CV Desarrollador Frontend"
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className={`create-btn ${loading ? "loading" : ""}`}
          disabled={isButtonDisabled}
          onClick={handleCreate}
        >
          {loading ? "Creando..." : "Crear CV"}
        </button>

        {!canCreateInCloud && (
          <p style={{ fontSize: "0.9em", marginTop: "1rem", color: "#7f8c8d", textAlign: "center" }}>
            Este CV se guardará localmente.<br />
            {isLogged
              ? "Necesitas una suscripción activa para guardar en la nube."
              : "Inicia sesión para respaldos en la nube."}
          </p>
        )}
      </div>
    </div>
  );
}