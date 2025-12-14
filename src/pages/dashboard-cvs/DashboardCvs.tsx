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
import { BiCloudUpload } from "react-icons/bi";

export default function DashboardCVs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = useSelector((state: IState) => state.user.logged);

  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    dispatch(setSidebar("cvs"));

    const loadAndSyncCvs = async () => {
      try {
        setLoading(true);
        setSyncing(false);

        // 1. Cargar CVs del backend
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

        // 3. SINCRONIZACIÓN AUTOMÁTICA
        const pendingSyncDrafts = localDrafts.filter((d: any) => d.backendId);

        if (pendingSyncDrafts.length > 0 && isLogged) {
          setSyncing(true);
          console.log(`Sincronizando automáticamente ${pendingSyncDrafts.length} CV(s)...`);

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

          // Eliminar sincronizados
          const remainingDrafts = localDrafts.filter(
            (d: any) => !successfulSyncs.includes(d.localId)
          );
          localStorage.setItem("draftCvs", JSON.stringify(remainingDrafts));
        }

        // 4. CONSTRUIR LISTA FINAL SIN DUPLICADOS
        const finalCvs: any[] = [];

        // Mapa de backendId que tienen borrador local (para evitar duplicados)
        const localBackendIds = new Set(
          localDrafts
            .filter((d: any) => d.backendId)
            .map((d: any) => d.backendId)
        );

        // Todos los borradores locales (incluyendo los con backendId)
        finalCvs.push(...localDrafts);

        // Solo agregar CVs del backend que NO tengan borrador local pendiente
        if (isLogged) {
          const backendWithoutLocal = backendCvs.filter(
            (cv) => !localBackendIds.has(cv.id)
          );
          finalCvs.push(...backendWithoutLocal);
        }

        setCvs(finalCvs);
      } catch (error) {
        console.error("Error en carga/sincronización:", error);
      } finally {
        setLoading(false);
        setSyncing(false);
      }
    };

    loadAndSyncCvs();
  }, [dispatch, isLogged]);

  const handleCreateClick = () => {
    dispatch(setTemplatePopupOpen(true));
  };

  const handleDelete = async (cvId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.confirm("¿Estás seguro de que quieres eliminar este CV? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
      const updatedDrafts = existingDrafts.filter(
        (d: any) => d.localId !== cvId && d.backendId !== cvId
      );
      localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));

      setCvs((prev) => prev.filter((cv) => (cv.id || cv.localId) !== cvId));
    } catch (error) {
      console.error("Error eliminando CV:", error);
      alert("No se pudo eliminar el CV.");
    }
  };

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

  return (
    <div className="dashboard-cvs">
      <div className="dashboard-header">
        <h1>Mis Currículums</h1>
        <p>Administra, visualiza o crea fácilmente nuevos CVs.</p>
        {syncing && (
          <p style={{ color: "#f59e0b", fontStyle: "italic", marginTop: "8px" }}>
            Sincronizando cambios pendientes...
          </p>
        )}
        {!isLogged && localStorage.getItem("draftCvs") && JSON.parse(localStorage.getItem("draftCvs") || "[]").length > 0 && (
          <p style={{ color: "#9333ea", fontStyle: "italic", marginTop: "8px" }}>
            Estás trabajando offline. Inicia sesión para sincronizar tus cambios.
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

          // Mostrar botón solo para borradores nuevos o cambios pendientes (si no logueado)
          const showSaveButton = isOffline && !(isLogged && cv.backendId);

          return (
            <div key={cvKey} className={`cv-item ${isOffline ? "draft" : ""}`}>
              {isOffline && <div className="draft-tag"><IoCloudOfflineSharp /></div>}
              {!isOffline && <div className="not-draft-tag"><BsFillCloudCheckFill /></div>}

              <button
                className="cv-delete-btn"
                onClick={(e) => handleDelete(cvKey, e)}
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
                  disabled={!isLogged}
                >
                  <BiCloudUpload />
                  {!isLogged ? "Inicia sesión" : "Guardar Online"}
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
                  {tpl.label} {isOffline && <span>Offline</span>}
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