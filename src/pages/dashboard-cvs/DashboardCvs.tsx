// DashboardCVs.tsx
import React, { useEffect, useState } from "react";
import "./DashboardCVs.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";

import { useDispatch } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import { setSidebar } from "../../reducers/sidebarSlice";
import { setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import { getAllCvsApi } from "../../api/cv";
import { useNavigate } from "react-router-dom";

export default function DashboardCVs() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar CVs al iniciar
  useEffect(() => {
    dispatch(setSidebar("cvs"));

    const fetchCvs = async () => {
      try {
        setLoading(true);
        const data = await getAllCvsApi(); // ← async/await API real
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

  return (
    <div className="dashboard-cvs">

      <div className="dashboard-header">
        <h1>Mis Currículums</h1>
        <p>Administra, visualiza o crea fácilmente nuevos CVs.</p>
      </div>

      {/* 🔹 Crear nuevo CV */}
      <div className="cv-item create-new" onClick={handleCreateClick}>
        <div className="create-box">
          <span className="plus">+</span>
          <p>Crear nuevo CV</p>
        </div>
      </div>

      {/* 🔹 Loading */}
      {loading && <p>Cargando tus CVs...</p>}

      {/* 🔹 Lista de CVs desde backend */}
      {!loading && cvs.length === 0 && (
        <p>No tienes CVs creados todavía.</p>
      )}

      {!loading &&
        cvs.map((cv) => {
          const tpl = templates.find((t) => t.id === cv.templateId) || templates[0];
          const Component = tpl.component;

          return (
            <div
              key={cv.id}
              className="cv-item"
              onClick={() => dispatch(setSelectedTemplateId(cv.templateId))}
            >
              <div className="cv-preview" onClick={()=> navigate(`/create/${cv.id}`)}>
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
                <h3>{cv.title}</h3>
                <p>{cv.cvTitle}</p>
                <span className="date">
                  Plantilla: {tpl.label} / {cv.createdAt?.split("T")[0]}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
