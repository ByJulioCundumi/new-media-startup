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
import { createCvApi, getCvCountApi } from "../../api/cv";
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
  const { subscriptionExpiresAt } = useSelector((state: IState) => state.user);

  const [cvTitle, setCvTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineCvCount, setOnlineCvCount] = useState<number | null>(null); // null = aún no consultado
  const [fetchingCount, setFetchingCount] = useState(false);

  if (!isOpen) return null;

  const hasSubscriptionTime = hasValidSubscriptionTime(subscriptionExpiresAt);
  const isFreeLimitReached = onlineCvCount !== null && !hasSubscriptionTime && onlineCvCount >= 1;

  // Cargar conteo de CVs online al abrir el popup (si está logueado)
  useEffect(() => {
    if (isLogged && isOpen) {
      const fetchCvCount = async () => {
        setFetchingCount(true);
        try {
          const count = await getCvCountApi();
          setOnlineCvCount(count);
        } catch (err) {
          console.error("Error obteniendo conteo de CVs:", err);
          setOnlineCvCount(0); // Permitir crear en caso de error de red
        } finally {
          setFetchingCount(false);
        }
      };

      fetchCvCount();
    } else if (!isLogged) {
      // Si no está logueado, no hay límite online
      setOnlineCvCount(0);
    }
  }, [isLogged, isOpen]);

  const createLocalDraft = (title: string, templateId: string) => {
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

  const handleCreate = async () => {
    if (!cvTitle.trim() || !selectedTemplateId) return;

    const title = cvTitle.trim();

    try {
      setLoading(true);

      let cvIdToNavigate: string;

      if (!isLogged) {
        cvIdToNavigate = createLocalDraft(title, selectedTemplateId);
        alert("CV creado como borrador local (sin iniciar sesión). Se guardará solo en este navegador.");
      } else if (hasSubscriptionTime) {
        const created = await createCvApi(title, selectedTemplateId);
        cvIdToNavigate = created.id;
      } else if (isFreeLimitReached) {
        cvIdToNavigate = createLocalDraft(title, selectedTemplateId);
        alert(
          "Has alcanzado el límite del plan gratuito (1 CV online).\n\n" +
          "Este nuevo CV se ha guardado como borrador local en tu navegador.\n" +
          "Actualiza tu plan para guardar CVs ilimitados en la nube."
        );
      } else {
        const created = await createCvApi(title, selectedTemplateId);
        cvIdToNavigate = created.id;
      }

      dispatch(setCreateCvPopup(false));
      dispatch(setTemplatePopupOpen(false));
      dispatch(setSelectedCvTitle(title));
      dispatch(setSelectedTemplateId(selectedTemplateId));
      navigate(`/create/${cvIdToNavigate}`);
    } catch (err: any) {
      console.error("Error al crear CV:", err);

      const localId = createLocalDraft(title, selectedTemplateId);
      alert(
        "No se pudo guardar en la nube (error de conexión o servidor).\n\n" +
        "El CV se ha creado como borrador local y podrás seguir editándolo."
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

  // El botón está deshabilitado hasta que tengamos el conteo real
  const isButtonDisabled = !cvTitle.trim() || loading || fetchingCount || onlineCvCount === null;

  return (
    <div className="createcv-overlay">
      <div className="createcv-modal">
        <button className="close-btn" onClick={() => dispatch(setCreateCvPopup(false))}>
          <IoClose />
        </button>

        <h2>Crear nuevo CV</h2>

        <p className="subtitle">
          {isLogged ? (
            fetchingCount ? (
              "Verificando tu límite de CVs..."
            ) : onlineCvCount === null ? (
              "Cargando estado de tu cuenta..."
            ) : isFreeLimitReached ? (
              <span style={{ color: "#e74c3c", fontWeight: "500", fontSize: "0.9rem" }}>
                Has alcanzado el límite (1/1 CV online)
              </span>
            ) : hasSubscriptionTime ? (
              "Acceso completo: crea todos los CVs que quieras en la nube."
            ) : (
              `Puedes guardar hasta 1 CV en la nube (${onlineCvCount}/1 usado)`
            )
          ) : (
            "Puedes crear un borrador sin iniciar sesión. Se guardará solo en este navegador."
          )}
        </p>

        <div className="field">
          <label>Título del CV</label>
          <input
            type="text"
            placeholder="Ej: CV Desarrollador Frontend"
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            disabled={loading || fetchingCount}
          />
        </div>

        <button
          className={`create-btn ${loading || fetchingCount ? "loading" : ""}`}
          disabled={isButtonDisabled}
          onClick={handleCreate}
        >
          {fetchingCount
            ? "Verificando límite..."
            : loading
            ? "Creando..."
            : "Crear CV"}
        </button>

        {isFreeLimitReached && (
          <p style={{ fontSize: "0.9em", marginTop: "1rem", color: "#7f8c8d", textAlign: "center" }}>
            (Este CV se guardará localmente)<br />
            Actualiza tu plan para CVs ilimitados, backups y acceso desde cualquier lugar.
          </p>
        )}
      </div>
    </div>
  );
}