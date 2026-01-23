// DashboardCVs.tsx
import React, { useEffect, useMemo, useState } from "react";
import "./dashboardcvs.scss";

import { templates } from "../../templates/templates";

import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import { setSidebar } from "../../reducers/sidebarSlice";
import {
  getAllCvsApi,
  deleteCvApi,
  updateCvApi,
  createCvApi,
} from "../../api/cv";
import { Link, useNavigate } from "react-router-dom";
import type { IState } from "../../interfaces/IState";
import { IoCloudOfflineSharp } from "react-icons/io5";
import { BsFillCloudCheckFill } from "react-icons/bs";
import { BiCloudUpload, BiSync } from "react-icons/bi";
import { BiLoaderAlt } from "react-icons/bi";
import SearchBar from "../../components/search-bar/SearchBar";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";

type CvFilter = "all" | "local" | "pending" | "online";

export default function DashboardCVs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state: IState) => state.user.logged);
  const { subscriptionExpiresAt } = useSelector((state: IState) => state.user);

  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<CvFilter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [syncingPending, setSyncingPending] = useState(false);

  const hasActiveSubscription = hasValidSubscriptionTime(subscriptionExpiresAt);
  const restrictedMessage = "Con el plan actual no puedes guardar o sincronizar CVs en la nube. Actualiza tu plan";

  const loadCvs = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      let backendCvs: any[] = [];
      if (isLogged) {
        try {
          backendCvs = await getAllCvsApi();
        } catch (err) {
          console.warn("Error cargando CVs del backend:", err);
        }
      }

      const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");

      const localBackendIds = new Set(
        localDrafts.filter((d: any) => d.backendId).map((d: any) => d.backendId)
      );

      const finalCvs: any[] = [...localDrafts];

      if (isLogged) {
        const backendWithoutLocal = backendCvs.filter((cv) => !localBackendIds.has(cv.id));
        finalCvs.push(...backendWithoutLocal);
      }

      setCvs(finalCvs);
    } catch (error) {
      console.error("Error cargando CVs:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setSidebar("cvs"));
    loadCvs(true);
  }, [dispatch, isLogged]);

  const handleCreateClick = () => {
    dispatch(setTemplatePopupOpen(true));
  };

  const handleDelete = async (cv: any, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.confirm("¿Estás seguro de que quieres eliminar este CV? Esta acción no se puede deshacer.")) {
      return;
    }

    const cvId = cv.id || cv.backendId || cv.localId;
    setDeletingId(cvId);

    try {
      if (cv.id && isLogged) {
        await deleteCvApi(cv.id);
      } else {
        const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
        const updatedDrafts = existingDrafts.filter(
          (d: any) => d.localId !== cv.localId && d.backendId !== cvId
        );
        localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));
      }
      await loadCvs();
    } catch (error: any) {
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

    if (!hasActiveSubscription) {
      alert(restrictedMessage);
      return;
    }

    setSavingId(draftCv.localId);

    try {
      const created = await createCvApi(draftCv.cvTitle, draftCv.templateId);
      const { localId, isDraft, ...cvData } = draftCv;
      await updateCvApi(created.id, cvData);

      const existingDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
      const updatedDrafts = existingDrafts.filter((d: any) => d.localId !== localId);
      localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));

      await loadCvs();
    } catch (error) {
      console.error("Error guardando en nube:", error);
      alert("Error al guardar en la nube");
    } finally {
      setSavingId(null);
    }
  };

  const filteredCvs = useMemo(() => {
    return cvs.filter((cv) => {
      const isLocalOnly = !!cv.localId && !cv.id && !cv.backendId;
      const isPendingSync = !!cv.backendId && !!cv.localId;
      const isOnline = !!cv.id && !cv.localId;

      const matchesSearch = cv.cvTitle.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (filterType === "local") matchesFilter = isLocalOnly;
      else if (filterType === "pending") matchesFilter = isPendingSync;
      else if (filterType === "online") matchesFilter = isOnline;

      return matchesSearch && matchesFilter;
    });
  }, [cvs, searchQuery, filterType]);

  const totalCvs = cvs.length;

  const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
  const pendingSyncCount = localDrafts.filter((d: any) => d.backendId).length;
  const hasPendingSync = isLogged && pendingSyncCount > 0;

  const handleSyncPending = async () => {
    if (!isLogged) return;

    if (!hasActiveSubscription) {
      alert(restrictedMessage);
      return;
    }

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

    const remainingDrafts = localDrafts.filter(
      (d: any) => !successfulSyncs.includes(d.localId)
    );
    localStorage.setItem("draftCvs", JSON.stringify(remainingDrafts));

    await loadCvs();

    setSyncingPending(false);

    if (successfulSyncs.length > 0) {
      alert(`¡${successfulSyncs.length} CV(s) sincronizados correctamente!`);
    } else {
      alert("No se pudieron sincronizar los cambios. Revisa tu conexión.");
    }
  };

  return (
    <div className="dashboard-box">
      <div className="dashboard-cvs">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>
            Mis Currículums
            <span className="cv-count">
              ({filteredCvs.length}/{totalCvs} CV{totalCvs !== 1 ? "s" : ""})
            </span>
          </h1>
          <p>Administra, visualiza y crea fácilmente nuevos CVs.</p>
        </div>

        <div className="header-right">
          <SearchBar
            textHolder="Buscar CV..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <select
            className="cv-filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as CvFilter)}
          >
            <option value="all">Todos los CVs</option>
            <option value="local">Solo locales</option>
            <option value="pending">Pendientes de sincronizar</option>
            <option value="online">Guardados online</option>
          </select>
        </div>
      </div>

      <div className="cv-info-box">
        <div className="cv-item create-new" onClick={handleCreateClick}>
          <div className="create-box">
            <span className="plus">+</span>
            <p>Crear nuevo CV</p>
          </div>
        </div>

        {!isLogged && localDrafts.length > 0 && (
          <p style={{ color: "#f8b43f", fontStyle: "italic", marginTop: "8px", textAlign: "center" }}>
            Inicia sesión para guardar CVs online.
          </p>
        )}

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
                Sincronizar cambios pendientes ({pendingSyncCount})
              </>
            )}
          </button>
        )}
      </div>

      {loading && <p className="loading-text">Cargando tus CVs...</p>}
      {!loading && filteredCvs.length === 0 && (
        <p className="no-cvs-text">
          {searchQuery || filterType !== "all"
            ? "No se encontraron CVs con los filtros aplicados."
            : "No tienes CVs creados todavía."}
        </p>
      )}

      {!loading &&
        filteredCvs.map((cv) => {
          const tpl = templates.find((t) => t.id === cv.templateId) || templates[0];
          const Component = tpl.component;

          const isLocalOnly = !!cv.localId && !cv.id && !cv.backendId;
          const isPendingSync = !!cv.backendId && !!cv.localId;
          const isOnline = !!cv.id && !cv.localId;

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

          const showSaveButton = isLocalOnly;

          return (
            <div key={cvKey} className={`cv-item ${isLocalOnly || isPendingSync ? "draft" : ""}`}>
              {(isLocalOnly || isPendingSync) && <div className="draft-tag"><IoCloudOfflineSharp /></div>}
              {isOnline && <div className="not-draft-tag"><BsFillCloudCheckFill /></div>}

              <button
                className="cv-delete-btn"
                onClick={(e) => handleDelete(cv, e)}
                title="Eliminar CV"
              >
                {deletingId === (cv.id || cv.localId) ? (
                  <span className="spinner">⟳</span>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="currentColor"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    />
                  </svg>
                )}
              </button>

              {hasQrCode && (
                <Link to={cv.publicId ? `https://www.cvremoto.com/cv/${cv.publicId}` : cv.identity.qrCodeUrl} target="blank" className="cv-qr-tag enabled">
                  QR 
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM16 16h2v2h-2zM18 18h2v2h-2zM14 14h2v2h-2zM20 14h2v2h-2zM16 20h2v2h-2zM14 18h2v2h-2z" />
                  </svg>
                </Link>
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
                  {savingId === cv.localId ? "Guardando..." : "Guardar CV"}
                </button>
              )}

              {isPendingSync && (
                <div className="cv-pending-tag">
                  <BiSync />
                  Sin Sincronizar
                </div>
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
                  {tpl.label}
                  {isLocalOnly && <span className="status-local"> (Borrador)</span>}
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
    <div className="line"></div>
    </div>
  );
}