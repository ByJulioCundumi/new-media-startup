// DashboardCVs.tsx
import React, { useEffect, useState } from "react";
import "./DashboardCVs.scss";

import { templates } from "../../templates/templates";

import { useDispatch } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import { setSidebar } from "../../reducers/sidebarSlice";
import { setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import { getAllCvsApi, deleteCvApi } from "../../api/cv"; // ← AÑADE deleteCvApi
import { useNavigate } from "react-router-dom";

export default function DashboardCVs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setSidebar("cvs"));

    const fetchCvs = async () => {
      try {
        setLoading(true);
        const data = await getAllCvsApi();
        setCvs(data);
      } catch (error) {
        console.error("Error cargando CVs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, [dispatch]);

  const handleCreateClick = () => {
    dispatch(setTemplatePopupOpen(true));
  };

  // Función para eliminar CV
  const handleDelete = async (cvId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // evita navegar al editor

    if (!window.confirm("¿Estás seguro de que quieres eliminar este CV? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setDeletingId(cvId);
      await deleteCvApi(cvId); // ← llama a la API
      setCvs(cvs.filter((cv) => cv.id !== cvId));
      console.log("CV eliminado con éxito");
    } catch (error) {
      console.error("Error eliminando CV:", error);
      alert("No se pudo eliminar el CV. Inténtalo de nuevo.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard-cvs">
      <div className="dashboard-header">
        <h1>Mis Currículums</h1>
        <p>Administra, visualiza o crea fácilmente nuevos CVs.</p>
      </div>

      {/* Crear nuevo */}
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

          return (
            <div key={cv.id} className="cv-item">
              {/* Botón eliminar */}
              <button
                className="cv-delete-btn"
                onClick={(e) => handleDelete(cv.id, e)}
                disabled={deletingId === cv.id}
                title="Eliminar CV"
              >
                {deletingId === cv.id ? (
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

              {/* Preview */}
              <div
                className="cv-preview"
                onClick={() => navigate(`/create/${cv.id}`)}
              >
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

              {/* Info */}
              <div className="cv-info">
                <h3>{cv.cvTitle}</h3>
                <p>Plantilla: {tpl.label}</p>
                <span className="date">
                  Actualizado el {new Date(cv.updatedAt).toLocaleDateString("es-ES")}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}