// DashboardCVs.tsx
import React, { useEffect, useState } from "react";
import "./DashboardCVs.scss";

import { templates } from "../../templates/templates";

import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import { setSidebar } from "../../reducers/sidebarSlice";
import { getAllCvsApi, deleteCvApi, updateCvApi, createCvApi } from "../../api/cv";
import { useNavigate } from "react-router-dom";
import type { IState } from "../../interfaces/IState";
import { IoCloudOfflineSharp } from "react-icons/io5";
import { BsFillCloudCheckFill } from "react-icons/bs";
import { BiCloudUpload, BiSync } from "react-icons/bi";
import { BiLoaderAlt } from "react-icons/bi";

export default function DashboardCVs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state: IState) => state.user.logged);

  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingPending, setSyncingPending] = useState(false); // Para sincronización manual global

  useEffect(() => {
    dispatch(setSidebar("cvs"));

    const loadCvs = async () => {
      try {
        setLoading(true);

        // 1. Cargar CVs del backend (solo si está logueado)
        let backendCvs: any[] = [];
        if (isLogged) {
          try {
            backendCvs = await getAllCvsApi();
          } catch (err) {
            console.warn("Error cargando CVs del backend:", err);
          }
        }

        // 2. Cargar borradores locales
        const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");

        // 3. Construir lista final sin duplicados
        const finalCvs: any[] = [];

        // IDs del backend que ya tienen borrador local pendiente
        const localBackendIds = new Set(
          localDrafts.filter((d: any) => d.backendId).map((d: any) => d.backendId)
        );

        // Añadir todos los borradores locales
        finalCvs.push(...localDrafts);

        // Añadir CVs del backend que no tengan cambios pendientes locales
        if (isLogged) {
          const backendWithoutLocal = backendCvs.filter(
            (cv) => !localBackendIds.has(cv.id)
          );
          finalCvs.push(...backendWithoutLocal);
        }

        setCvs(finalCvs);
      } catch (error) {
        console.error("Error cargando CVs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCvs();
  }, [dispatch, isLogged]);

  const handleCreateClick = () => {
    dispatch(setTemplatePopupOpen(true));
  };

  const handleDelete = async (cv: any, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.confirm("¿Estás seguro de que quieres eliminar este CV? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const cvId = cv.id || cv.backendId || cv.localId;

      // CV sincronizado en el backend
      if (cv.id && isLogged) {
        await deleteCvApi(cv.id);
        const freshBackendCvs = await getAllCvsApi();
        const currentDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
        setCvs([...currentDrafts, ...freshBackendCvs]);
        return;
      }

      // Borrador local
      const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
      const updatedDrafts = existingDrafts.filter(
        (d: any) => d.localId !== cv.localId && d.backendId !== cvId
      );
      localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));

      setCvs((prev) =>
        prev.filter((item) => {
          const itemKey = item.id || item.backendId || item.localId;
          return itemKey !== cvId;
        })
      );
    } catch (error: any) {
      console.error("Error eliminando CV:", error);
      alert("No se pudo eliminar el CV.");
    }
  };

  // Guardar CV nuevo (sin backendId) en la nube
  const handleSaveToCloud = async (draftCv: any, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLogged) {
      alert("Debes iniciar sesión para guardar en la nube");
      return;
    }

    try {
      const created = await createCvApi(draftCv.cvTitle, draftCv.templateId);
      const { localId, isDraft, ...cvData } = draftCv;
      await updateCvApi(created.id, cvData);

      const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
      const updatedDrafts = existingDrafts.filter((d: any) => d.localId !== localId);
      localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));

      const freshBackendCvs = await getAllCvsApi();
      setCvs([...updatedDrafts, ...freshBackendCvs]);
    } catch (error) {
      console.error("Error guardando en nube:", error);
      alert("Error al guardar en la nube");
    }
  };

  // Sincronizar manualmente TODOS los cambios pendientes (CVs con backendId)
  const handleSyncPending = async () => {
    if (!isLogged) return;

    const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
    const pendingSyncDrafts = localDrafts.filter((d: any) => d.backendId);

    if (pendingSyncDrafts.length === 0) {
      alert("No hay cambios pendientes para sincronizar.");
      return;
    }

    setSyncingPending(true);

    const successfulSyncs: string[] = [];

    for (const draft of pendingSyncDrafts) {
      try {
        const { localId, isDraft, backendId, ...cvData } = draft;
        await updateCvApi(backendId, cvData);
        successfulSyncs.push(localId);
      } catch (err) {
        console.error(`Error sincronizando CV ${draft.backendId}:`, err);
      }
    }

    // Eliminar los sincronizados exitosamente
    const remainingDrafts = localDrafts.filter(
      (d: any) => !successfulSyncs.includes(d.localId)
    );
    localStorage.setItem("draftCvs", JSON.stringify(remainingDrafts));

    // Recargar lista
    const backendCvs = await getAllCvsApi();
    setCvs([...remainingDrafts, ...backendCvs]);

    setSyncingPending(false);

    if (successfulSyncs.length > 0) {
      alert(`¡${successfulSyncs.length} CV(s) sincronizados correctamente!`);
    }
  };

  // Detectar si hay cambios pendientes
  const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
  const hasPendingSync = isLogged && localDrafts.some((d: any) => d.backendId);

  return (
    <div className="dashboard-cvs">
      <div className="dashboard-header">
        <h1>Mis Currículums</h1>
        <p>Administra, visualiza o crea fácilmente nuevos CVs.</p>

        {/* Botón global de sincronización manual */}
        {hasPendingSync && (
          <button
            className="sync-pending-btn"
            onClick={handleSyncPending}
            disabled={syncingPending}
          >
            {syncingPending ? (
              <>
                <BiLoaderAlt className="spinner" />
                Sincronizando...
              </>
            ) : (
              <>
                <BiSync />
                Sincronizar cambios pendientes ({localDrafts.filter((d: any) => d.backendId).length})
              </>
            )}
          </button>
        )}

        {!isLogged && localDrafts.length > 0 && (
          <p style={{ color: "#f8b43f", fontStyle: "italic", marginTop: "8px" }}>
            Estás trabajando en el entorno local. Inicia sesión para guardar tus cv.
          </p>
        )}
      </div>

      <div className="cv-item create-new" onClick={handleCreateClick}>
        <div className="create-box">
          <span className="plus">+</span>
          <p>Crear nuevo CV</p>
        </div>
      </div>

      {loading && <p>Cargando tus CVs...</p>}
      {!loading && cvs.length === 0 && <p>No tienes CVs creados todavía.</p>}

      {!loading &&
        cvs.map((cv) => {
          const tpl = templates.find((t) => t.id === cv.templateId) || templates[0];
          const Component = tpl.component;

          const isOffline = !!cv.localId;
          const cvKey = cv.id || cv.localId;
          const hasQrCode = cv.identity?.allowQrCode === true;

          const sections = cv.cvSections?.sections || [];
          const enabledSections = sections.filter((s: any) => s.enabled);
          const totalProgress = enabledSections.length > 0
            ? Math.round(enabledSections.reduce((sum: number, s: any) => sum + s.progress, 0) / enabledSections.length)
            : 0;

          const progressColor = totalProgress < 30
            ? "#ef4444ad"
            : totalProgress < 70
            ? "#f59f0b88"
            : "#0bc2f5";

          // Botón "Guardar Online" solo para CVs nuevos (sin backendId)
          const showSaveButton = isOffline && !cv.backendId;

          // Indicador visual si tiene cambios pendientes
          const hasPendingChanges = cv.backendId && isOffline;

          return (
            <div key={cvKey} className={`cv-item ${isOffline ? "draft" : ""}`}>
              {isOffline && <div className="draft-tag"><IoCloudOfflineSharp /></div>}
              {!isOffline && <div className="not-draft-tag"><BsFillCloudCheckFill /></div>}

              <button
                className="cv-delete-btn"
                onClick={(e) => handleDelete(cv, e)}
                title="Eliminar CV"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>

              {hasQrCode && (
                <div className="cv-qr-tag enabled">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM16 16h2v2h-2zM18 18h2v2h-2zM14 14h2v2h-2zM20 14h2v2h-2zM16 20h2v2h-2zM14 18h2v2h-2z" />
                  </svg>
                </div>
              )}

              <div className="cv-progress-tag" style={{ backgroundColor: progressColor }}>
                <span className="progress-text">{totalProgress}%</span>
              </div>

              {showSaveButton && (
                <button
                  className="cv-save-cloud-btn"
                  onClick={(e) => handleSaveToCloud(cv, e)}
                >
                  <BiCloudUpload />
                  Guardar Online
                </button>
              )}

              <div className="cv-preview" onClick={() => navigate(`/create/${cvKey}`)}>
                <div className="cv-preview-scale">
                  <Component
                    personalInfo={cv.personalInfoEntries || []}
                    identitySection={cv.identity || {}}
                    contactSection={cv.contactEntries || []}
                    profileSection={cv.profileContent || ""}
                    educationSection={cv.educationEntries || []}
                    experienceSection={cv.experienceEntries || []}
                    skillSection={cv.skillsEntries || []}
                    languageSection={cv.languagesEntries || []}
                    linkSection={cv.linksEntries || []}
                    courseSection={cv.coursesEntries || []}
                    hobbieSection={cv.hobbiesEntries || []}
                    referenceSection={cv.referencesEntries || []}
                    awardSection={cv.awardsEntries || []}
                    customSection={cv.customEntries || []}
                    sectionsConfig={cv.cvSections?.sections || []}
                    sectionsOrder={cv.cvSections?.order || []}
                  />
                </div>
              </div>

              <div className="cv-info">
                <h3>{cv.cvTitle}</h3>
                <p>
                  {hasPendingChanges && <span style={{ color: "#f59e0b" }}> <BiSync/> </span>}
                  {tpl.label} {isOffline && hasPendingChanges && !isLogged && "(Local)"} {isOffline && hasPendingChanges && isLogged && "(Sincronizar)"} {isOffline && !hasPendingChanges && "(Local)"}
                  <span> - </span>
                  <span className="date">
                    {new Date(cv.updatedAt || cv.createdAt).toLocaleDateString("es-ES")}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}