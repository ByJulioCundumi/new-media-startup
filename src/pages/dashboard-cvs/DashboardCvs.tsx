// DashboardCVs.tsx
import React, { useEffect, useState } from "react";
import "./DashboardCVs.scss";

import { templates } from "../../templates/templates";

import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import { setSidebar } from "../../reducers/sidebarSlice";
import { getAllCvsApi, deleteCvApi, createCvApi, updateCvApi } from "../../api/cv";
import { useNavigate } from "react-router-dom";
import type { IState } from "../../interfaces/IState";
import { GrUpdate } from "react-icons/gr";
import { IoCloudOfflineSharp } from "react-icons/io5";

export default function DashboardCVs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = useSelector((state: IState) => state.user.logged);

  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setSidebar("cvs"));

    const fetchCvs = async () => {
      try {
        setLoading(true);

        let backendCvs = [];
        if (isLogged) {
          backendCvs = await getAllCvsApi();
        }

        const localDrafts = JSON.parse(localStorage.getItem('draftCvs') || '[]');
        setCvs([...localDrafts, ...backendCvs]);
      } catch (error) {
        console.error("Error cargando CVs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, [dispatch, isLogged]);

  const handleCreateClick = () => {
    dispatch(setTemplatePopupOpen(true));
  };

  const handleDelete = async (cvId: string, e: React.MouseEvent, isDraft: boolean) => {
    e.stopPropagation();

    if (!window.confirm("¿Estás seguro de que quieres eliminar este CV? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setDeletingId(cvId);
      if (isDraft) {
        const existingDrafts = JSON.parse(localStorage.getItem('draftCvs') || '[]');
        const updatedDrafts = existingDrafts.filter((draft: any) => draft.localId !== cvId);
        localStorage.setItem('draftCvs', JSON.stringify(updatedDrafts));
      } else {
        await deleteCvApi(cvId);
      }
      setCvs(cvs.filter((cv) => (cv.id || cv.localId) !== cvId));
    } catch (error) {
      console.error("Error eliminando CV:", error);
      alert("No se pudo eliminar el CV.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveToCloud = async (draftCv: any, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLogged) {
      alert("Debes iniciar sesión para guardar en la nube");
      return;
    }

    try {
      setSavingId(draftCv.localId);
      const { localId, isDraft, ...cvData } = draftCv;
      const created = await createCvApi(draftCv.cvTitle, draftCv.templateId);
      await updateCvApi(created.id, cvData);

      const existingDrafts = JSON.parse(localStorage.getItem('draftCvs') || '[]');
      const updatedDrafts = existingDrafts.filter((d: any) => d.localId !== localId);
      localStorage.setItem('draftCvs', JSON.stringify(updatedDrafts));

      setCvs([...updatedDrafts, { ...created, ...cvData }]);
    } catch (error) {
      console.error("Error guardando en nube:", error);
      alert("Error al guardar en la nube");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="dashboard-cvs">
      <div className="dashboard-header">
        <h1>Mis Currículums</h1>
        <p>Administra, visualiza o crea fácilmente nuevos CVs.</p>
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
          const isDraft = !!cv.isDraft;
          const cvKey = cv.id || cv.localId;

          const hasQrCode = cv.identity?.allowQrCode === true;

          // Progreso total
          const sections = cv.cvSections?.sections || [];
          const enabledSections = sections.filter((s: any) => s.enabled);
          const totalProgress = enabledSections.length > 0
            ? Math.round(enabledSections.reduce((sum: number, s: any) => sum + s.progress, 0) / enabledSections.length)
            : 0;

          const progressColor = totalProgress < 30 
            ? "#ef4444ad"
            : totalProgress < 70 
            ? "#f59f0b88"
            : "#10b9818a";

          return (
            <div key={cvKey} className={`cv-item ${isDraft ? "draft" : ""}`}>
              {/* Etiqueta Borrador (arriba izquierda) */}
              {isDraft && <div className="draft-tag"><IoCloudOfflineSharp /></div>}

              {/* Botón eliminar (arriba derecha) */}
              <button
                className="cv-delete-btn"
                onClick={(e) => handleDelete(cvKey, e, isDraft)}
                disabled={deletingId === cvKey}
                title="Eliminar CV"
              >
                {deletingId === cvKey ? (
                  <span className="spinner">⟳</span>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                )}
              </button>

              {/* Tag QR (arriba izquierda, debajo de borrador si existe) */}
              {hasQrCode && (
                <div className="cv-qr-tag enabled">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM16 16h2v2h-2zM18 18h2v2h-2zM14 14h2v2h-2zM20 14h2v2h-2zM16 20h2v2h-2zM14 18h2v2h-2z" />
                  </svg>
                  <span>QR Habilitado</span>
                </div>
              )}

              {/* Tag progreso (abajo derecha) */}
              <div className="cv-progress-tag" style={{ backgroundColor: progressColor }}>
                <span className="progress-text">{totalProgress}%</span>
              </div>

              {/* Botón Guardar en nube (abajo izquierda, solo drafts y logueado) */}
              {isDraft && isLogged && (
                <button
                  className="cv-save-cloud-btn"
                  onClick={(e) => handleSaveToCloud(cv, e)}
                  disabled={savingId === cv.localId}
                >
                  {savingId === cv.localId ? "Guardando..." : "Guardar en nube"}
                </button>
              )}

              {/* Preview */}
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
                <p>Plantilla: {tpl.label}</p>
                <span className="date">
                  <GrUpdate /> {new Date(cv.updatedAt || cv.createdAt).toLocaleDateString("es-ES")}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}